'use client';

import { useNostrSubscribe } from 'nostr-hooks';

import useStore from '@/store';

import { useProfileHex } from '@/hooks';

const useProfileContacts = (profileAddress: string) => {
  const profileHex = useProfileHex(profileAddress);

  const relays = useStore((store) => store.relays);

  const { events: contactEvents, eose: contactEose } = useNostrSubscribe({
    relays,
    filters: [{ authors: [profileHex], kinds: [3] }],
    options: { enabled: !!profileHex },
  });

  const isFetchingContacts = !contactEose && !contactEvents.length;
  const isContactsEmpty = contactEose && !contactEvents.length;

  return {
    isFetchingContacts,
    isContactsEmpty,
    contactEvents,
    contactEose,
  };
};

export default useProfileContacts;
