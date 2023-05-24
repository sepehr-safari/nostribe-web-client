'use client';

import React, { useState } from 'react';
import Avatar from '@/components/Avatar';
import Upload from '@/components/Upload';
import CardContainer from '@/components/CardContainer';
import useStore from '@/store';
import { nip19, Event } from 'nostr-tools';
import Link from 'next/link';
import { PaperClipIcon } from '@heroicons/react/24/outline';

import usePublish from "@/hooks/usePublish";
import {useLocalState} from "@/utils/LocalState";

interface Props {
  onSubmit?: (event: Event) => void;
  replyingTo?: Event;
  placeholder?: string;
}

const NewPostForm: React.FC<Props> = ({
  onSubmit,
  replyingTo,
  placeholder,
}) => {
  const [postText, setPostText] = useLocalState('newPostDraft', '');
  const [isExpanded, setIsExpanded] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const formRef = React.useRef<HTMLFormElement>(null);
  const userData = useStore((state) => state.auth.user.data);
  const textAreaRef = React.useRef(null);

  const publish = usePublish();

  const updateTextAreaHeight = () => {
    if (!textAreaRef.current) return;
    const current = textAreaRef.current as HTMLTextAreaElement;
    current.style.height = 'inherit';
    current.style.height = `${current.scrollHeight}px`;
  };

  const handlePostTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
    updateTextAreaHeight();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Posting:', postText);
    const eventData: any = {
      kind: 1,
      content: postText,
    };
    if (replyingTo) {
      eventData.tags = [
        ['e', replyingTo.id, '', 'reply'],
        ['p', replyingTo.pubkey],
        ...replyingTo.tags,
      ];
      eventData.tags = eventData.tags.filter((tag: string[], index: number) => {
        // Remove duplicate tags
        return (
          index ===
          eventData.tags.findIndex(
            (t: string[]) => t[0] === tag[0] && t[1] === tag[1]
          )
        );
      });
    }
    const event = await publish(eventData);
    setPostText('');
    onSubmit?.(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      formRef.current?.requestSubmit();
    }
  }

  const myNpub = userData?.publicKey
    ? nip19.npubEncode(userData?.publicKey)
    : '';

  return (
    <CardContainer>
      <form ref={formRef} onSubmit={handleSubmit} className="w-full">
        <div className="flex items-start">
          <Link href={`/${myNpub}`} className="mr-4">
            <Avatar width="w-12" pub={userData?.publicKey || ''} />{' '}
            {/* Render the Avatar component here */}
          </Link>
          <div className="flex-grow">
            <textarea
              ref={textAreaRef}
              onFocus={() => setIsExpanded(true)}
              id="postText"
              name="postText"
              value={postText}
              onChange={handlePostTextChange}
              onKeyDown={handleKeyDown}
              className="p-2 mt-1 w-full h-12 bg-black focus:ring-blue-500 focus:border-blue-500 block w-full text-lg border-gray-700 rounded-md text-white"
              placeholder={placeholder || "What's on your mind?"}
            />
          </div>
        </div>
        {isExpanded && (
          <div className="flex items-center justify-between mt-2">
            <Upload
              onError={(e) => setUploadError(e)}
              onUrl={(url) => {
                setPostText(postText + ' ' + url);
                updateTextAreaHeight();
              }}
            >
              <button
                className="btn btn-ghost btn-circle"
                onClick={(e) => e.preventDefault()}
              >
                <PaperClipIcon width={24} />
              </button>
            </Upload>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={postText.length === 0}
            >
              Post
            </button>
          </div>
        )}
        {uploadError && <p className="text-warning">{uploadError}</p>}
      </form>
    </CardContainer>
  );
};

export default NewPostForm;
