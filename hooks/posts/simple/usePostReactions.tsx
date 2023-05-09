'use client';

import { useSubscribe } from 'nostr-hooks';

import useStore from '@/store';

const usePostReactions = (postId: string) => {
  const relays = useStore((store) => store.relays);

  const { events: reactionEvents, eose: reactionEose } = useSubscribe({
    relays,
    filters: [{ '#e': [postId], kinds: [1, 6, 7, 9735] }],
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
