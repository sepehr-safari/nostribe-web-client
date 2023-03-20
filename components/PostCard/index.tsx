'use client';

import {
  ArrowPathIcon,
  BoltIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Event, Filter, nip19 } from 'nostr-tools';
import { memo, useEffect, useState } from 'react';

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
  const [eventList, setEventList] = useState<Event[]>([]);

  useEffect(() => {
    const handlePostEvent = (e: Event) =>
      setEventList((oldEvent) => [...oldEvent, e]);

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

  if (profileObject === null) {
    return null;
  }

  return (
    <>
      <article className="card bg-neutral text-neutral-content shadow-2xl shadow-black">
        <div className="card-body p-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <Link
                href={`/profile/${nip19.npubEncode(postEvent.pubkey)}`}
                className="flex gap-4"
              >
                <Avatar
                  url={profileObject?.picture || '/nostribe.png'}
                  width="w-12"
                />

                <div className="flex flex-col">
                  {profileObject?.name && (
                    <p className="text-lg font-bold">
                      {profileObject.name.slice(0, 35)}
                    </p>
                  )}
                  {profileObject?.nip05 && (
                    <p className="text-sm font-bold bg-gradient-to-r from-warning to-accent text-transparent bg-clip-text">
                      {profileObject.nip05.slice(0, 35)}
                    </p>
                  )}
                </div>
              </Link>

              <div className="ml-auto">
                <button className="btn btn-sm btn-ghost gap-2">
                  <PlusIcon width={16} />
                  Follow
                </button>
              </div>
            </div>

            <div className="flex flex-col break-words gap-2 ml-16 mr-2">
              {imageInsideContent && (
                <div className="relative object-contain overflow-hidden w-2/3">
                  <img
                    src={imageInsideContent[0]}
                    alt={postEvent.content.slice(0, 20)}
                  />
                </div>
              )}

              <Link href={`/post/${nip19.noteEncode(postEvent.id)}`}>
                {postEvent.content}
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap w-full justify-evenly">
            <button className="btn btn-ghost btn-sm px-2 gap-2">
              <BoltIcon width={24} />

              {eventList.filter((event) => event.kind === 9735).length}
            </button>

            <button className="btn btn-ghost btn-sm px-2 gap-2">
              <ChatBubbleOvalLeftIcon width={24} />

              {eventList.filter((event) => event.kind === 1).length}
            </button>

            <button className="btn btn-ghost btn-sm px-2 gap-2">
              <HeartIcon width={24} />

              {eventList.filter((event) => event.kind === 7).length}
            </button>

            <button className="btn btn-ghost btn-sm px-2 gap-2">
              <ArrowPathIcon width={24} />

              {}
            </button>
          </div>

          {/* <div className="flex flex-col gap-2">
            {eventList
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
