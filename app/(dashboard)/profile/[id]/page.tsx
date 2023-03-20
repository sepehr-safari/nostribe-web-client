'use client';

import { Event, Filter } from 'nostr-tools';
import { memo, useEffect, useMemo, useState } from 'react';

import { PostCard, ProfileCard } from '@/components';

import { getProfileHex, subscribe } from '@/utils';

function Profile({ params }: { params: { id: string } }) {
  const [pubkey, setPubkey] = useState<string | null>('');
  const [eventList, setEventList] = useState<Event[]>([]);

  useEffect(() => {
    getProfileHex(params.id).then((hex) => setPubkey(hex));
  }, [params.id]);

  useEffect(() => {
    if (!pubkey) return;

    const handleEvent = (e: Event) =>
      setEventList((oldEvent) => [...oldEvent, e]);

    const filters: Filter[] = [
      { authors: [pubkey], kinds: [0, 1, 3], limit: 10 },
    ];

    const subscription = subscribe(handleEvent, filters);

    return () => subscription.unsub();
  }, [pubkey]);

  const profileEvent = useMemo(
    () => eventList.find((e) => e.kind === 0),
    [eventList]
  );

  // [TODO]: object might be empty
  const contactsEvent = useMemo(
    () => eventList.find((e) => e.kind === 3),
    [eventList]
  );

  if (pubkey === null) {
    return <>Profile Not Found</>;
  }

  if (eventList.length === 0 || !profileEvent) {
    return <>Loading...</>;
  }

  return (
    <>
      {profileEvent && (
        <ProfileCard
          profileEvent={profileEvent}
          contactsEvent={contactsEvent!}
        />
      )}

      {eventList.map(
        (event, index) =>
          event.kind === 1 && (
            <PostCard
              key={index}
              postEvent={event}
              profileEvent={profileEvent}
            />
          )
      )}
    </>
  );
}

export default memo(Profile);
