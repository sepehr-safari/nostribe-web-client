'use client';

import { memo } from 'react';
import { useNostrSubscribe } from 'nostr-hooks';

import { PostCard, Spinner } from '@/components';

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

const Feed = () => {
  const filters = [{ kinds: [1], limit: 6 }];
  const { events: noteEvents, eose } = useNostrSubscribe({
    filters,
    relays,
    options: { force: true },
  });

  if (eose && !noteEvents.length) return <p>No Events</p>;

  if (!noteEvents.length) return <Spinner />;

  return (
    <>
      {noteEvents.map((noteEvent, index) => (
        <PostCard key={index} noteEvent={noteEvent} />
      ))}
    </>
  );
};

export default memo(Feed);
