'use client';

import { useSubscribe } from 'nostr-hooks';

import useStore from '@/store';

const useGlobalPosts = () => {
  const relays = useStore((store) => store.relays);

  const { events: postEvents, eose: postEose } = useSubscribe({
    relays,
    filters: [{ kinds: [1], limit: 10 }],
    options: { invalidate: true },
  });

  const isFetching = !postEose && !postEvents.length;
  const isPostsEmpty = postEose && !postEvents.length;

  return {
    postEvents,
    postEose,
    isFetching,
    isPostsEmpty,
  };
};

export default useGlobalPosts;
