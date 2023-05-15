'use client';

import { useSubscribe } from 'nostr-hooks';

import useStore from '@/store';

const useDirectMessages = () => {
  const relays = useStore((store) => store.relays);
  const userData = useStore((state) => state.auth.user.data);

  const { events: directMessageEvents, eose: directMessageEose } = useSubscribe({
    relays,
    filters: [
      { authors: [userData?.publicKey || ''], kinds: [4], limit: 500 },
      { kinds: [4], "#p": [userData?.publicKey || ''], limit: 500 },
    ],
    options: {
      force: false,
      batchingInterval: 500,
      invalidate: false,
      closeAfterEose: true,
    },
  });

  const isFetching = !directMessageEose && !directMessageEvents.length;
  const isDirectMessagesEmpty = directMessageEose && !directMessageEvents.length;

  return {
    directMessageEvents,
    directMessageEose,
    isFetching,
    isDirectMessagesEmpty,
  };
};

export default useDirectMessages;
