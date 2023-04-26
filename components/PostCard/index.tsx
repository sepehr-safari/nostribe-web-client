'use client';

import {
  ArrowPathIcon,
  BoltIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

import {
  Avatar,
  AvatarLoader,
  BoxLoader,
  CardContainer,
  Nip05View,
  PostContent,
} from '@/components';

import { usePostEvent, usePostReactions, useProfileContent } from '@/hooks';

const PostCard = ({ postId }: { postId: string }) => {
  const { isFetching, postEvent, createdAt, nip19NoteId } =
    usePostEvent(postId);

  const { npub, displayName, picture, nip05 } = useProfileContent(
    postEvent?.pubkey || ''
  );

  const { reactionEvents } = usePostReactions(postId);

  return (
    <>
      <CardContainer>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Link
              prefetch={false}
              href={`/profile/${npub}`}
              className="flex items-center gap-4"
            >
              {picture ? (
                <Avatar url={picture || '/nostribe.png'} width="w-14" />
              ) : isFetching ? (
                <div className="w-14 h-14 flex items-center">
                  <AvatarLoader />
                </div>
              ) : (
                <Avatar url="/nostribe.png" width="w-14" />
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

                {nip05 ? (
                  <Nip05View text={nip05} />
                ) : (
                  isFetching && <BoxLoader />
                )}

                {createdAt && (
                  <div className="text-xs leading-5 opacity-50">
                    {createdAt.toLocaleString()}
                  </div>
                )}
              </div>
            </Link>

            <div className="ml-auto">
              <div className="dropdown-left dropdown">
                <label tabIndex={0} className="btn-ghost btn-circle btn m-1">
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
                    <Link
                      prefetch={false}
                      className="text-xs"
                      href={`/post/${nip19NoteId}`}
                    >
                      Open Post
                    </Link>
                  </li>
                  <li>
                    <Link
                      prefetch={false}
                      className="text-xs"
                      href={`/profile/${npub}`}
                    >
                      Open Profile
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="ml-16 mr-2 flex flex-col gap-4 break-words">
            <PostContent postEvent={postEvent} />
          </div>
        </div>

        <hr className="-mx-4 mt-2 opacity-10" />

        <div className="-m-4 flex flex-wrap">
          <button className="btn-ghost rounded-bl-box btn w-1/4 content-center gap-2 rounded-t-none rounded-br-none py-7 px-2">
            <BoltIcon width={24} />

            {reactionEvents.filter((event) => event.kind === 9735).length}
          </button>

          <button className="btn-ghost btn w-1/4 content-center gap-2 rounded-none py-7 px-2">
            <ChatBubbleOvalLeftIcon width={24} />

            {reactionEvents.filter((event) => event.kind === 1).length}
          </button>

          <button className="btn-ghost btn w-1/4 content-center gap-2 rounded-none py-7 px-2">
            <HeartIcon width={24} />

            {reactionEvents.filter((event) => event.kind === 7).length}
          </button>

          <button className="btn-ghost rounded-br-box btn w-1/4 content-center gap-2 rounded-t-none rounded-bl-none py-7 px-2">
            <ArrowPathIcon width={24} />

            {}
          </button>
        </div>
      </CardContainer>
    </>
  );
};

export default PostCard;
