'use client';

import { useNostrSubscribe } from 'nostr-hooks';

import useStore from '@/store';

import { useProfileHex } from '@/hooks';

const useProfilePosts = (profileAddress: string) => {
  const profileHex = useProfileHex(profileAddress);

  const relays = useStore((store) => store.relays);

  const { events: postEvents, eose: postEose } = useNostrSubscribe({
    relays,
    filters: [{ authors: [profileHex], kinds: [1], limit: 6 }],
    options: { enabled: !!profileHex },
  });

  const isFetchingPosts = !postEose && !postEvents.length;
  const isPostsEmpty = postEose && !postEvents.length;

  return {
    isFetchingPosts,
    isPostsEmpty,
    postEvents,
    postEose,
  };
};

export default useProfilePosts;
