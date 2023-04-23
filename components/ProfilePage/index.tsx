'use client';

import { useNostrSubscribe } from 'nostr-hooks';
import { memo, useEffect } from 'react';

import { PostCard, ProfileCard } from '@/components';

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

const ProfilePage = ({ profileHex }: { profileHex: string }) => {
  const metadataFilters = [{ authors: [profileHex], kinds: [0] }];
  const filters = [{ authors: [profileHex], kinds: [1], limit: 6 }];

  const { events: metadataEvents, eose } = useNostrSubscribe({
    filters: metadataFilters,
    relays,
    options: { batchingInterval: 100 },
  });

  const { events: noteEvents } = useNostrSubscribe({
    filters,
    relays,
    options: { batchingInterval: 100 },
  });

  useEffect(() => {
    if (metadataEvents.length === 0) return;

    const content = metadataEvents[0].content || '{}';
    const { display_name, name } = JSON.parse(content);
    const displayName = display_name || name;

    document.title = `${displayName} | Nostribe`;

    return () => {
      document.title = 'Nostribe';
    };
  }, [metadataEvents]);

  if (eose && !metadataEvents.length) return <p>Profile Not Found</p>;

  return (
    <>
      <ProfileCard profileHex={profileHex} providedMetadata={metadataEvents} />

      {noteEvents.map((noteEvent, index) => (
        <PostCard
          key={index}
          noteEvent={noteEvent}
          providedMetadata={metadataEvents[0]}
        />
      ))}
    </>
  );
};

export default memo(ProfilePage);
