'use client';

import {
  ArrowPathIcon,
  BoltIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Event, nip19 } from 'nostr-tools';
import { memo } from 'react';

import { Avatar, CardContainer, Nip05View, PostContent } from '@/components';

import { IAuthor } from '@/types';

const PostCard = ({
  metadata,
  event,
}: {
  metadata: Event[];
  event: Event & { reactions: Event[]; mentions: Event[] };
}) => {
  const profileObject: IAuthor = JSON.parse(metadata[0]?.content || '{}');

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
                <Avatar
                  url={profileObject?.picture || '/nostribe.png'}
                  width="w-14"
                />

                <div className="flex flex-col">
                  {profileObject?.name && (
                    <h4 className="leading-5 font-bold">
                      {profileObject.name.length > 25
                        ? profileObject.name.slice(0, 10) +
                          '...' +
                          profileObject.name.slice(-15)
                        : profileObject.name}
                    </h4>
                  )}

                  {profileObject?.nip05 && (
                    <Nip05View text={profileObject.nip05} />
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
                  <label tabIndex={0} className="btn btn-ghost btn-circle m-1">
                    <EllipsisHorizontalIcon width={24} />
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32"
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

            <div className="flex flex-col break-words gap-4 ml-16 mr-2">
              <PostContent event={event} />
            </div>
          </div>

          <hr className="opacity-10 -mx-4 mt-2" />

          <div className="flex flex-wrap -m-4">
            <button className="py-7 content-center btn btn-ghost rounded-t-none rounded-br-none rounded-bl-box px-2 gap-2 w-1/4">
              <BoltIcon width={24} />

              {event.reactions?.filter((event) => event.kind === 9735).length}
            </button>

            <button className="py-7 content-center btn btn-ghost rounded-none px-2 gap-2 w-1/4">
              <ChatBubbleOvalLeftIcon width={24} />

              {event.reactions?.filter((event) => event.kind === 1).length}
            </button>

            <button className="py-7 content-center btn btn-ghost rounded-none px-2 gap-2 w-1/4">
              <HeartIcon width={24} />

              {event.reactions?.filter((event) => event.kind === 7).length}
            </button>

            <button className="py-7 content-center btn btn-ghost rounded-t-none rounded-bl-none rounded-br-box px-2 gap-2 w-1/4">
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
