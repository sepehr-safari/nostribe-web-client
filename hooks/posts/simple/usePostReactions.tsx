'use client';

import { useSubscribe } from 'nostr-hooks';

import useStore from '@/store';

const usePostReactions = (postId: string | undefined) => {
  const relays = useStore((store) => store.relays);

  let { events: reactionEvents, eose: reactionEose } = useSubscribe({
    relays,
    filters: !!postId ? [{ '#e': [postId], kinds: [1, 6, 7, 9735] }] : [],
    options: {
      closeAfterEose: false,
      enabled: !!postId,
      cacheRefresh: true,
      batchingInterval: 2000,
    },
  });

  // only 1 like or repost per author. TODO kind 1 reposts
  reactionEvents = reactionEvents.filter((event, index, self) => {
    if (event.kind === 1 || event.kind === 9735) return true;
    return (
      self.findIndex(
        (e) => e.pubkey === event.pubkey && e.kind === event.kind
      ) === index
    );
  });

  const isFetchingReactions = !reactionEose && !reactionEvents.length;
  const isReactionsEmpty = reactionEose && !reactionEvents.length;

  return {
    reactionEvents,
    reactionEose,
    isFetchingReactions,
    isReactionsEmpty,
  };
};

export default usePostReactions;
