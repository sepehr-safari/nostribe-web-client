'use client';

import {
  ArrowPathIcon,
  BoltIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Event, Filter, nip19 } from 'nostr-tools';
import { memo, useEffect, useMemo, useState } from 'react';

import Avatar from '../Avatar';

import { subscribe } from '@/utils';

import { IAuthor } from '@/types';

const PostCard = ({
  profileEvent,
  postEvent,
}: {
  profileEvent?: Event;
  postEvent: Event;
}) => {
  const [profileObject, setProfileObject] = useState<IAuthor>();
  const [reactionEventList, setReactionEventList] = useState<Event[]>([]);

  useEffect(() => {
    const handlePostEvent = (e: Event) =>
      setReactionEventList((oldEvent) => [...oldEvent, e]);

    const filters: Filter[] = [{ '#e': [postEvent.id], kinds: [1, 7, 9735] }];

    const subscription = subscribe(handlePostEvent, filters);

    return () => subscription.unsub();
  }, [postEvent.id]);

  useEffect(() => {
    if (profileEvent) {
      setProfileObject(JSON.parse(profileEvent.content));

      return;
    }

    const handleProfileEvent = (e: Event) =>
      setProfileObject(JSON.parse(e.content) || null);

    const filters: Filter[] = [{ authors: [postEvent.pubkey], kinds: [0] }];

    const subscription = subscribe(handleProfileEvent, filters);

    return () => subscription.unsub();
  }, [profileEvent, postEvent.pubkey]);

  const imageRegex =
    /(?:https?:\/\/)?(?:www\.)?\S+\.(?:jpg|jpeg|png|gif|bmp)/gi;
  const imageInsideContent = postEvent.content.match(imageRegex);

  const contentView = useMemo(
    () =>
      imageInsideContent
        ? imageInsideContent.reduce(
            (content, imgUrl) => content.replace(imgUrl, ''),
            postEvent.content
          )
        : postEvent.content,
    [imageInsideContent]
  );

  const createdAt = new Date(postEvent.created_at * 1000);

  if (profileObject === null) {
    return null;
  }

  return (
    <>
      <article className="card bg-neutral text-neutral-content shadow-2xl shadow-black">
        <div className="card-body gap-4 p-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Link
                href={`/profile/${nip19.npubEncode(postEvent.pubkey)}`}
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
                    <h5 className="text-xs leading-5 font-bold bg-gradient-to-r from-warning to-accent text-transparent bg-clip-text">
                      {profileObject.nip05.length > 25
                        ? profileObject.nip05.slice(0, 10) +
                          '...' +
                          profileObject.nip05.slice(-15)
                        : profileObject.nip05}
                    </h5>
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
                              postEvent.id
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
                        href={`/post/${nip19.noteEncode(postEvent.id)}`}
                      >
                        Open Post
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-xs"
                        href={`/profile/${nip19.npubEncode(postEvent.pubkey)}`}
                      >
                        Open Profile
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col break-words gap-4 ml-16 mr-2">
              {imageInsideContent &&
                imageInsideContent.map((imgUrl, index) => (
                  <div
                    key={index}
                    className="relative object-contain overflow-hidden w-2/3"
                  >
                    <img src={imgUrl} alt={contentView.slice(0, 20)} />
                  </div>
                ))}

              <p>{contentView}</p>
            </div>
          </div>

          <hr className="opacity-10 -mx-4 mt-2" />

          <div className="flex flex-wrap -m-4">
            <button className="py-7 content-center btn btn-ghost rounded-t-none rounded-br-none rounded-bl-box px-2 gap-2 w-1/4">
              <BoltIcon width={24} />

              {reactionEventList.filter((event) => event.kind === 9735).length}
            </button>

            <button className="py-7 content-center btn btn-ghost rounded-none px-2 gap-2 w-1/4">
              <ChatBubbleOvalLeftIcon width={24} />

              {reactionEventList.filter((event) => event.kind === 1).length}
            </button>

            <button className="py-7 content-center btn btn-ghost rounded-none px-2 gap-2 w-1/4">
              <HeartIcon width={24} />

              {reactionEventList.filter((event) => event.kind === 7).length}
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
      </article>
    </>
  );
};

export default memo(PostCard);
