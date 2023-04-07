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
import { memo } from 'react';

import {
  Avatar,
  AvatarLoader,
  BoxLoader,
  CardContainer,
  Nip05View,
  PostContent,
} from '@/components';

import useStore from '@/store';

import { IAuthor, PostData } from '@/types';

const PostCard = ({ data }: { data: PostData }) => {
  const isFetching = useStore((state) => state.feed.isFetching);

  const { event, metadata, reactions = [] } = data;

  const profileObject: IAuthor = JSON.parse(metadata?.content || '{}');

  const displayName = profileObject.display_name || profileObject.name;

  const createdAt = new Date(event.created_at * 1000);

  return (
    <>
      <CardContainer>
        <div className="card-body gap-4 p-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Link
                href={`/profile/${nip19.npubEncode(event.pubkey)}`}
                className="flex items-center gap-4"
              >
                {profileObject && profileObject.picture ? (
                  <Avatar
                    url={profileObject.picture || '/nostribe.png'}
                    width="w-14"
                  />
                ) : isFetching ? (
                  <AvatarLoader />
                ) : (
                  <Avatar url="/nostribe.png" width="w-14" />
                )}

                <div className="flex flex-col">
                  {profileObject && displayName ? (
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

                  {profileObject && profileObject.nip05 ? (
                    <Nip05View text={profileObject.nip05} />
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
                <div className="dropdown dropdown-left">
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
                            `${location.origin}/post/${nip19.noteEncode(
                              event.id
                            )}`
                          )
                        }
                      >
                        Copy Link
                      </button>
                    </li>
                    <li>
                      <Link
                        className="text-xs"
                        href={`/post/${nip19.noteEncode(event.id)}`}
                      >
                        Open Post
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-xs"
                        href={`/profile/${nip19.npubEncode(event.pubkey)}`}
                      >
                        Open Profile
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="ml-16 mr-2 flex flex-col gap-4 break-words">
              <PostContent data={data} />
            </div>
          </div>

          <hr className="-mx-4 mt-2 opacity-10" />

          <div className="-m-4 flex flex-wrap">
            <button className="btn-ghost rounded-bl-box btn w-1/4 content-center gap-2 rounded-t-none rounded-br-none py-7 px-2">
              <BoltIcon width={24} />

              {reactions.filter((event) => event.kind === 9735).length}
            </button>

            <button className="btn-ghost btn w-1/4 content-center gap-2 rounded-none py-7 px-2">
              <ChatBubbleOvalLeftIcon width={24} />

              {reactions.filter((event) => event.kind === 1).length}
            </button>

            <button className="btn-ghost btn w-1/4 content-center gap-2 rounded-none py-7 px-2">
              <HeartIcon width={24} />

              {reactions.filter((event) => event.kind === 7).length}
            </button>

            <button className="btn-ghost rounded-br-box btn w-1/4 content-center gap-2 rounded-t-none rounded-bl-none py-7 px-2">
              <ArrowPathIcon width={24} />

              {}
            </button>
          </div>

          {/* <div className="flex flex-col gap-2">
            {reactionEventList
              .filter((event) => event.kind === 1)
              .map((comment, index) => (
                <div key={index} className="flex gap-2">
                  <div>{comment.content}</div>
                </div>
              ))}
          </div> */}
        </div>
      </CardContainer>
    </>
  );
};

export default memo(PostCard);
