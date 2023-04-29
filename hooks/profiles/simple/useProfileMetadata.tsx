'use client';

import { useSubscribe } from 'nostr-hooks';

import useStore from '@/store';

import { useProfileHex } from '@/hooks';

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

  return {
    isFetchingMetadata,
    isMetadataEmpty,
    metadataEvents,
    metadataEose,
  };
};

export default useProfileMetadata;
