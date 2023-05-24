'use client';

import { useSubscribe } from 'nostr-hooks';

import useStore from '@/store';

import { useProfileHex } from '@/hooks';
import { Event } from 'nostr-tools';

const useProfileMetadata = (profileAddress: string | undefined) => {
  const profileHex = useProfileHex(profileAddress);

  const relays = useStore((store) => store.relays);

  const {
    events: metadataEvents,
    eose: metadataEose,
    invalidate,
  } = useSubscribe({
    relays,
    filters: !!profileHex ? [{ authors: [profileHex], kinds: [0] }] : [],
    options: { enabled: !!profileHex },
  });

  const isFetchingMetadata = !metadataEose && !metadataEvents.length;
  const isMetadataEmpty = metadataEose && !metadataEvents.length;

  const latestMetadataEvent = metadataEvents?.reduce((prev, curr) => {
    if (!prev) return curr;
    if (curr.created_at > prev.created_at) return curr;
    return prev;
  }, null as Event | null);

  let metadata: any = {};
  try {
    metadata = latestMetadataEvent
      ? JSON.parse(latestMetadataEvent.content)
      : {};
  } catch (e) {
    console.error(e);
  }

  return {
    isFetchingMetadata,
    isMetadataEmpty,
    latestMetadataEvent,
    metadataEose,
    metadata,
    invalidate,
  };
};

export default useProfileMetadata;
