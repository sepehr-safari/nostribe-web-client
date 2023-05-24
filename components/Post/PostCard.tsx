'use client';

import Link from 'next/link';

import { nip19 } from 'nostr-tools';

import { BaseAvatar } from '@/components/Avatar';
import AvatarLoader from '@/components/Avatar/AvatarLoader';
import CardContainer from '@/components/CardContainer';
import PostContent from '@/components/Post/PostContent';
import RelativeTime from '@/components/RelativeTime';
import Name from '@/components/Name';
import Spinner from '@/components/Spinner';
import NewPostForm from '@/components/NewPostForm';
import Reactions from './Reactions';
import Dropdown from './Dropdown';

import { usePostEvent, usePostReactions, useProfileContent } from '@/hooks';
import { useRouter } from 'next/navigation';
import { MouseEventHandler, useMemo } from 'react';
import { getReplyingToEvent, getThreadRoot, isRepost } from '@/utils/event';
import { toHexKey } from '@/utils/hexKey';
import { useLocalState } from '@/utils/LocalState';

type Props = {
  postId: string;
  showReplies?: number;
  standalone?: boolean;
  asReply?: boolean;
  asRepliedMessage?: boolean;
  asInlineQuote?: boolean;
  showReplyForm?: boolean;
};

const PostCard = ({
  postId,
  showReplies,
  standalone,
  asReply,
  asRepliedMessage,
  asInlineQuote,
  showReplyForm,
}: Props) => {
  const router = useRouter();

  let invalid;
  try {
    postId = toHexKey(postId);
  } catch (e) {
    invalid = true;
  }
  const { isFetching, postEvent, createdAt, nip19NoteId } =
    usePostEvent(postId);

  let [mutedUsers] = useLocalState('muted', {});

  const { displayName, picture } = useProfileContent(postEvent?.pubkey || '');
  const npub = nip19.npubEncode(postEvent?.pubkey || '');

  const { reactionEvents } = usePostReactions(postId);

  const sortedReactions = useMemo(() => {
    return reactionEvents.sort((a, b) => a.created_at - b.created_at);
  }, [reactionEvents]);

  if (invalid) {
    return (
      <CardContainer>
        <div className="flex items-center justify-center h-32">
          Invalid note ID {postId}
        </div>
      </CardContainer>
    );
  }

  const onClick: MouseEventHandler = (e) => {
    if (standalone) return;
    const target = e.target as HTMLElement;
    const selectors = [
      'a',
      'button',
      '.btn',
      'video',
      'audio',
      'input',
      'textarea',
      'iframe',
      'img',
    ];

    const isMatch = selectors.some((selector) => target.closest(selector));

    if (!isMatch) {
      e.preventDefault();
      router.push(`/${nip19NoteId}`);
    }
  };

  const replyingToEvent = postEvent && getReplyingToEvent(postEvent);
  const replyingToUsers = postEvent?.tags
    ?.filter((tag) => tag[0] === 'p' && tag[3] !== 'mention')
    .filter(
      (tag, index, self) =>
        self.findIndex((t) => t[0] === tag[0] && t[1] === tag[1]) === index
    );
  const threadRoot = replyingToEvent && getThreadRoot(postEvent);

  if (!postEvent) {
    return (
      <CardContainer>
        <div onClick={onClick} className="flex flex-col gap-2 cursor-pointer">
          <Spinner />
        </div>
      </CardContainer>
    );
  }

  return (
    <>
      {postEvent &&
      !asInlineQuote &&
      !asReply &&
      !asRepliedMessage &&
      threadRoot &&
      threadRoot !== replyingToEvent ? (
        <Link
          prefetch={false}
          href={`/${nip19.noteEncode(threadRoot)}`}
          className="-mb-2 mt-2 text-sm opacity-50 flex items-center gap-2 px-4"
        >
          Show thread
        </Link>
      ) : (
        ''
      )}
      {standalone && replyingToEvent ? (
        <PostCard
          postId={replyingToEvent}
          asRepliedMessage={true}
          showReplies={0}
        />
      ) : (
        ''
      )}
      <CardContainer>
        <div
          className={`flex flex-col gap-2 ${
            standalone ? '' : 'cursor-pointer'
          }`}
          onClick={onClick}
        >
          <div className="flex items-center gap-2">
            <Link
              prefetch={false}
              href={`/${npub}`}
              className="flex items-center gap-2"
            >
              {picture ? (
                <BaseAvatar url={picture || '/nostribe.png'} width="w-12" />
              ) : isFetching ? (
                <div className="w-12 h-12 flex items-center">
                  <AvatarLoader />
                </div>
              ) : (
                <BaseAvatar url="/nostribe.png" width="w-12" />
              )}

              <div className="flex flex-col">
                {displayName && (
                  <h4 className="font-bold leading-5">
                    {displayName.length > 25
                      ? displayName.slice(0, 10) +
                        '...' +
                        displayName.slice(-15)
                      : displayName}
                  </h4>
                )}

                {createdAt && (
                  <div className="text-xs leading-5 opacity-50">
                    <RelativeTime date={new Date(createdAt)} />
                  </div>
                )}
              </div>
            </Link>

            <Dropdown nip19NoteId={nip19NoteId} postEvent={postEvent} />
          </div>

          {replyingToEvent && replyingToUsers && replyingToUsers.length ? (
            <small className="opacity-50 flex items-center gap-1">
              Replying to
              {replyingToUsers.slice(0, 3).map((tag) => (
                <Link
                  prefetch={false}
                  href={`/${nip19.npubEncode(tag[1])}`}
                  key={`${postId}replyingTo${tag[1]}`}
                >
                  <Name pub={tag[1]} />
                </Link>
              ))}
              {replyingToUsers.length > 3 ? (
                <span className="opacity-50">
                  {' '}
                  and {replyingToUsers.length - 3} more
                </span>
              ) : (
                ''
              )}
            </small>
          ) : (
            ''
          )}

          <div className="flex flex-col gap-2 break-words">
            <PostContent
              postEvent={postEvent}
              standalone={standalone || false}
            />
          </div>
        </div>

        {!asInlineQuote ? (
          <Reactions
            standalone={standalone || false}
            event={postEvent}
            reactionEvents={reactionEvents}
            nip19NoteId={nip19NoteId}
          />
        ) : (
          ''
        )}
      </CardContainer>
      {showReplyForm ? (
        <>
          <NewPostForm placeholder="Write your reply" replyingTo={postEvent} />
          <hr className="-mx-4 mt-2 opacity-10" />
        </>
      ) : (
        ''
      )}
      {showReplies
        ? sortedReactions
            .filter((event) => {
              if (mutedUsers[event.pubkey]) return false;
              if (event.kind !== 1 || isRepost(event)) return false;
              return getReplyingToEvent(event) === postId;
            })
            .map((event) => (
              <PostCard
                postId={event.id}
                key={`${postId}reply${event.id}`}
                showReplies={1}
                asReply={true}
              />
            ))
        : ''}
    </>
  );
};

export default PostCard;
