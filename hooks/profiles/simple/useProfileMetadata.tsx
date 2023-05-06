'use client';

import { useSubscribe } from 'nostr-hooks';

import useStore from '@/store';

import { useProfileHex } from '@/hooks';
import {Event} from "nostr-tools";

const useProfileMetadata = (profileAddress: string) => {
  const profileHex = useProfileHex(profileAddress);

  const relays = useStore((store) => store.relays);

  const { events: metadataEvents, eose: metadataEose } = useSubscribe({
    relays,
    filters: [{ authors: [profileHex], kinds: [0] }],
    options: { enabled: !!profileHex },
  });

  const isFetchingMetadata = !metadataEose && !metadataEvents.length;
  const isMetadataEmpty = metadataEose && !metadataEvents.length;

  const latestMetadataEvent = metadataEvents?.reduce((prev, curr) => {
    if (!prev) return curr;
    if (curr.created_at > prev.created_at) return curr;
    return prev;
  }, null as Event | null);

  return {
    isFetchingMetadata,
    isMetadataEmpty,
    latestMetadataEvent,
    metadataEose,
  };
};

export default useProfileMetadata;
