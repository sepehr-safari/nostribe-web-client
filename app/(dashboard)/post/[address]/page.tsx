'use client';

import { useNostrSubscribe } from 'nostr-hooks';
import { nip19 } from 'nostr-tools';
import { memo } from 'react';

import { PostCard } from '@/components';

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

const Post = ({ params }: { params: { address: string } }) => {
  const postId = params.address.startsWith('note')
    ? nip19.decode(params.address).data.toString()
    : params.address;

  const filters = [{ ids: [postId] }];

  const { events: noteEvents } = useNostrSubscribe({
    filters,
    relays,
    options: { batchingInterval: 100 },
  });

  return (
    <>
      {noteEvents.map((noteEvent, index) => (
        <PostCard key={index} noteEvent={noteEvent} />
      ))}
    </>
  );
};

export default memo(Post);
