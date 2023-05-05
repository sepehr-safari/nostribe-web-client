'use client';

import {
  ArrowPathIcon,
  BoltIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

import { nip19 } from 'nostr-tools';

import { BaseAvatar } from '@/components/Avatar';
import AvatarLoader from '@/components/Avatar/AvatarLoader';
import BoxLoader from '@/components/BoxLoader';
import CardContainer from '@/components/CardContainer';
import PostContent from '@/components/PostContent';
import RelativeTime from '@/components/RelativeTime';

import { usePostEvent, usePostReactions, useProfileContent } from '@/hooks';
import { useRouter } from 'next/navigation';
import {MouseEventHandler, useMemo} from "react";

type Props = { postId: string, showReplies?: number, standalone?: boolean };

const PostCard = ({ postId, showReplies, standalone }: Props) => {
  const router = useRouter();
  const { isFetching, postEvent, createdAt, nip19NoteId } =
    usePostEvent(postId);

  const { displayName, picture } = useProfileContent(
    postEvent?.pubkey || ''
  );
  const npub = nip19.npubEncode(postEvent?.pubkey || '');

  const { reactionEvents } = usePostReactions(postId);

  // don't re-sort on every render, only when reactionEvents changed
  const sortedReactions = useMemo(() => {
    return reactionEvents.sort((a, b) => a.created_at - b.created_at);
  }, [reactionEvents]);

  const onClick: MouseEventHandler = (e) => {
    if (standalone) return;
    const target = e.target as HTMLElement;
    const selectors = ['a', 'button', '.btn'];

    const isMatch = selectors.some((selector) => target.closest(selector));

    if (!isMatch) {
      e.preventDefault();
      router.push(`/post/${nip19NoteId}`);
    }
  }

  return (
    <>
      <CardContainer>
        <div className={`flex flex-col gap-2 ${standalone ? '' : 'cursor-pointer'}`} onClick={onClick}>
          <div className="flex items-center gap-2">
            <Link
              prefetch={false}
              href={`/profile/${npub}`}
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
                {displayName ? (
                  <h4 className="font-bold leading-5">
                    {displayName.length > 25
                      ? displayName.slice(0, 10) +
                        '...' +
                        displayName.slice(-15)
                      : displayName}
                  </h4>
                ) : (
                  isFetching && <BoxLoader />
                )}

                {createdAt && (
                  <div className="text-xs leading-5 opacity-50">
                    <RelativeTime date={new Date(createdAt)} />
                  </div>
                )}
              </div>
            </Link>

            <div className="ml-auto">
              <div className="dropdown-left dropdown">
                <label tabIndex={0} className="btn-ghost btn-circle btn m-1 text-gray-500">
                  <EllipsisHorizontalIcon width={24} />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu rounded-box w-32 bg-base-100 p-2 shadow-lg shadow-black"
                >
                  <li>
                    <button
                      className="text-start text-xs"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `${location.origin}/post/${nip19NoteId}`
                        )
                      }
                    >
                      Copy Link
                    </button>
                  </li>
                  <li>
                    <button
                      className="text-start text-xs"
                      onClick={() =>
                        navigator.clipboard.writeText(nip19NoteId)
                      }
                    >
                      Copy ID
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 break-words">
            <PostContent postEvent={postEvent} standalone={standalone || false} />
          </div>
        </div>

        <hr className="-mx-4 mt-2 opacity-10" />

        <div className="-m-4 flex flex-wrap">
          <button className="btn-ghost hover:bg-transparent text-gray-500 hover:text-iris-orange btn w-1/4 content-center gap-2 rounded-none p-2">
            <BoltIcon width={18} />

            {reactionEvents.filter((event) => event.kind === 9735).length}
          </button>

          <button className="btn-ghost hover:bg-transparent text-gray-500 hover:text-iris-blue btn w-1/4 content-center gap-2 rounded-none p-2">
            <ChatBubbleOvalLeftIcon width={18} />

            {reactionEvents.filter((event) => event.kind === 1).length}
          </button>

          <button className="btn-ghost hover:bg-transparent text-gray-500 hover:text-iris-purple btn w-1/4 content-center gap-2 rounded-none p-2">
            <HeartIcon width={18} />

            {reactionEvents.filter((event) => event.kind === 7).length}
          </button>

          <button className="btn-ghost hover:bg-transparent text-gray-500 hover:text-iris-green btn w-1/4 content-center gap-2 rounded-none p-2">
            <ArrowPathIcon width={18} />
            {reactionEvents.filter((event) => {
              // @ts-ignore nostr-tools doesn't like kind 6 reposts. but should check also kind 1 reposts.
              return event.kind === 6;
            }).length}
          </button>
        </div>
      </CardContainer>
      {showReplies && (
        sortedReactions.filter((event) => event.kind === 1).map((event) => (
          <PostCard postId={event.id} key={event.id} showReplies={1} />
        ))
      )}
    </>
  );
};

export default PostCard;
