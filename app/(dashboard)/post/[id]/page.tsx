'use client';

import { Event, Filter, nip19 } from 'nostr-tools';
import { memo, useEffect, useState } from 'react';

import { subscribe } from '@/utils';

import { PostCard } from '@/components';

function Post({ params }: { params: { id: string } }) {
  if (params.id.startsWith('note')) {
    const { data } = nip19.decode(params.id);

    params.id = data.toString();
  }

  const [eventList, setEventList] = useState<Event[]>([]);

  useEffect(() => {
    const handleEvent = (e: Event) =>
      setEventList((oldEvent) => [...oldEvent, e]);

    const filters: Filter[] = [{ ids: [params.id], kinds: [1], limit: 1 }];

    const subscription = subscribe(handleEvent, filters);

    return () => subscription.unsub();
  }, [params.id]);

  if (eventList.length === 0) {
    return <>Loading...</>;
  }

  return (
    <>
      {eventList.map(
        (event, index) =>
          event.kind === 1 && <PostCard key={index} postEvent={event} />
      )}
    </>
  );
}

export default memo(Post);
