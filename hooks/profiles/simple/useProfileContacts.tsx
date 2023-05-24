'use client';

import { useSubscribe } from 'nostr-hooks';

import useStore from '@/store';

import { useProfileHex } from '@/hooks';
import { Event } from 'nostr-tools';
import { useMemo, useState } from 'react';

const useProfileContacts = (profileAddress: string | undefined) => {
  const [latestContactEvent, setLatestContactEvent] = useState<
    Event | undefined
  >(undefined);
  const [userRelays, setUserRelays] = useState({} as any);
  const profileHex = useProfileHex(profileAddress);
  const defaultRelays = useStore((store) => store.relays);

  const { events: contactEvents, eose: contactEose } = useSubscribe({
    relays: defaultRelays,
    filters: !!profileHex ? [{ authors: [profileHex], kinds: [3] }] : [],
    options: { enabled: !!profileHex, invalidate: true, closeAfterEose: false },
  });

  const isFetchingContacts = !contactEose && !contactEvents.length;
  const isContactsEmpty = contactEose && !contactEvents.length;

  const latest = useMemo(
    () =>
      contactEvents?.reduce((prev, curr) => {
        if (!prev) return curr;
        if (curr.created_at > prev.created_at) return curr;
        return prev;
      }, null as Event | null),
    [contactEvents]
  );

  if (
    latest &&
    (!latestContactEvent || latestContactEvent.created_at < latest.created_at)
  ) {
    setLatestContactEvent(latest);
    try {
      setUserRelays(JSON.parse(latest.content || '{}'));
    } catch (e) {
      console.error(e);
    }
  }

  const defaultRelaysObj = useMemo(
    () =>
      defaultRelays.reduce((prev, curr) => {
        prev[curr] = { read: true, write: true };
        return prev;
      }, {} as any),
    [defaultRelays]
  );

  const relaysOrDefaults = Object.keys(userRelays).length
    ? userRelays
    : defaultRelaysObj;

  return {
    isFetchingContacts,
    isContactsEmpty,
    latestContactEvent,
    contactEose,
    relays: userRelays,
    relaysOrDefaults,
  };
};

export default useProfileContacts;
