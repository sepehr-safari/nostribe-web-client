'use client';

import { useSubscribe } from 'nostr-hooks';

import useStore from '@/store';

const useNotifications = () => {
  const relays = useStore((store) => store.relays);
  const userData = useStore((state) => state.auth.user.data);

  const { events: notificationEvents, eose: notificationEose } = useSubscribe({
    relays,
    filters: [{ kinds: [1, 6, 7], limit: 100, '#p': [userData?.publicKey || ''] }],
  });

  const isFetching = !notificationEose && !notificationEvents.length;
  const isNotificationsEmpty = notificationEose && !notificationEvents.length;

  return {
    notificationEvents,
    notificationEose,
    isFetching,
    isNotificationsEmpty,
  };
};

export default useNotifications;
