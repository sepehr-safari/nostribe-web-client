'use client';

import React, { useState } from 'react';
import { Avatar, CardContainer } from '@/components';
import useStore from "@/store";
import {nip19} from "nostr-tools";
import Link from "next/link";

import usePublish from "@/hooks/usePublish";

interface Props {}

const NewPostForm: React.FC<Props> = () => {
  const [postText, setPostText] = useState('');
  const userData = useStore((state) => state.auth.user.data);

  const publish = usePublish();

  const handlePostTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Posting:', postText);
    publish({
      kind: 1,
      content: postText,
    });
    setPostText('');
  };

  const myNpub = userData?.publicKey ? nip19.npubEncode(userData?.publicKey) : '';

  return (
    <CardContainer>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex items-start">
          <Link href={`/profile/${myNpub}`} className="mr-4">
            <Avatar width="w-12" pub={userData?.publicKey || ''} /> {/* Render the Avatar component here */}
          </Link>
          <div className="flex-grow">
            <textarea
              id="postText"
              name="postText"
              value={postText}
              onChange={handlePostTextChange}
              className="p-2 mt-1 mb-4 w-full h-12 bg-black focus:ring-blue-500 focus:border-blue-500 block w-full text-lg border-gray-700 rounded-md text-white"
              placeholder="What's on your mind?"
              required
            />
            {postText.length > 0 && (
              <button type="submit" className="btn btn-primary w-full mt-2">
                Post
              </button>
            )}
          </div>
        </div>
      </form>
    </CardContainer>
  );
};

export default NewPostForm;
