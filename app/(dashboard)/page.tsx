'use client';

import { Event, Filter } from 'nostr-tools';
import { useEffect, useState } from 'react';

import { PostCard } from '@/components';

import { subscribe, verifyContent } from '@/utils';

export default function Feed() {
  const [eventList, setEventList] = useState<Event[]>([]);

  useEffect(() => {
    const handleEvent = (e: Event) =>
      verifyContent(e) && setEventList((oldEvent) => [...oldEvent, e]);

    const filters: Filter[] = [{ kinds: [1], limit: 5 }];

    const subscription = subscribe(handleEvent, filters);

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
