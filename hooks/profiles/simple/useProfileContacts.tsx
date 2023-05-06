'use client';

import { useSubscribe } from 'nostr-hooks';

import useStore from '@/store';

import { useProfileHex } from '@/hooks';
import {Event} from "nostr-tools";

const useProfileContacts = (profileAddress: string) => {
  const profileHex = useProfileHex(profileAddress);

  const relays = useStore((store) => store.relays);

  const { events: contactEvents, eose: contactEose } = useSubscribe({
    relays,
    filters: [{ authors: [profileHex], kinds: [3] }],
    options: { enabled: !!profileHex },
  });

  const isFetchingContacts = !contactEose && !contactEvents.length;
  const isContactsEmpty = contactEose && !contactEvents.length;

  const latestContactEvent = contactEvents?.reduce((prev, curr) => {
    if (!prev) return curr;
    if (curr.created_at > prev.created_at) return curr;
    return prev;
  }, null as Event | null);

  return {
    isFetchingContacts,
    isContactsEmpty,
    latestContactEvent,
    contactEose,
  };
};

export default useProfileContacts;
