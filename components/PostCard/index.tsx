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

import { useNostrSubscribe } from 'nostr-hooks';

import { IAuthor } from '@/types';

import {
  Avatar,
  AvatarLoader,
  BoxLoader,
  CardContainer,
  Nip05View,
  PostContent,
} from '@/components';

const relays = [
  'wss://relay.damus.io',
  'wss://relay.snort.social',
  'wss://eden.nostr.land',
  'wss://relay.nostr.info',
  'wss://offchain.pub',
  'wss://nostr-pub.wellorder.net',
  'wss://nostr.fmt.wiz.biz',
  'wss://nos.lol',
];

const View = ({
  noteEvent,
  metadataEvent,
  reactionEvents,
  isFetching,
}: {
  noteEvent: Event;
  metadataEvent: Event;
  reactionEvents: Event[];
  isFetching: boolean;
}) => {
  const profileObject: IAuthor =
    !!metadataEvent && JSON.parse(metadataEvent.content || '{}');

  const displayName = profileObject.display_name || profileObject.name;

  const createdAt = new Date(noteEvent.created_at * 1000);

  return (
    <>
      <CardContainer>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Link
              href={`/profile/${nip19.npubEncode(noteEvent.pubkey)}`}
              className="flex items-center gap-4"
            >
              {profileObject && profileObject.picture ? (
                <Avatar
                  url={profileObject.picture || '/nostribe.png'}
                  width="w-14"
                />
              ) : isFetching ? (
                <div className="w-14 h-14 flex items-center">
                  <AvatarLoader />
                </div>
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
                          `${location.origin}/post/${nip19.noteEncode(
                            noteEvent.id
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
                      href={`/post/${nip19.noteEncode(noteEvent.id)}`}
                    >
                      Open Post
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-xs"
                      href={`/profile/${nip19.npubEncode(noteEvent.pubkey)}`}
                    >
                      Open Profile
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="ml-16 mr-2 flex flex-col gap-4 break-words">
            <PostContent noteEvent={noteEvent} />
          </div>
        </div>

        {/* {reactions
          .filter((event) => event.kind === 1)
          .map((comment, index) => (
            <PostCard2 key={index} data={{ event: comment }} />
          ))} */}

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

const PostCard = ({
  noteEvent,
  providedMetadata,
}: {
  noteEvent: Event;
  providedMetadata?: Event;
}) => {
  const metadataFilters = [{ authors: [noteEvent.pubkey], kinds: [0] }];
  const { events: metadataEvents, eose } = useNostrSubscribe({
    filters: metadataFilters,
    relays,
    options: { batchingInterval: 500, enabled: !providedMetadata },
  });

  const reactionFilters = [{ '#e': [noteEvent.id], kinds: [1, 7, 9735] }];
  const { events: reactionEvents } = useNostrSubscribe({
    filters: reactionFilters,
    relays,
    options: { batchingInterval: 500 },
  });

  return (
    <View
      noteEvent={noteEvent}
      metadataEvent={providedMetadata || metadataEvents[0]}
      reactionEvents={reactionEvents}
      isFetching={!eose && !metadataEvents.length && !providedMetadata}
    />
  );
};

export default memo(PostCard);
