'use client';

import { Event, Filter } from 'nostr-tools';
import { useCallback, useEffect, useState } from 'react';

import { PostCard } from '@/components';

import { useSubscription } from '@/hooks';
import { isVerifiedContent } from '@/utils';

export default function Feed() {
  const [eventList, setEventList] = useState<Event[]>([]);

  const handleEvent = useCallback(
    (e: Event) =>
      isVerifiedContent(e) && setEventList((oldEvent) => [...oldEvent, e]),
    []
  );

  useEffect(() => {
    const filters: Filter[] = [{ kinds: [1], limit: 5 }];

    const subscription = useSubscription(handleEvent, filters);

    return () => subscription.unsub();
  }, []);

  if (eventList.length === 0) {
    return <>Loading...</>;
  }

  return (
    <>
      {eventList.map((event, index) => (
        <PostCard key={index} postEvent={event} />
      ))}
    </>
  );
}
