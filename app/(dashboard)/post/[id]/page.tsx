'use client';

import { Event, Filter, nip19 } from 'nostr-tools';
import { memo, useCallback, useEffect, useState } from 'react';

import { useSubscription } from '@/hooks';

import { PostCard } from '@/components';

function Post({ params }: { params: { id: string } }) {
  if (params.id.startsWith('note')) {
    const { data } = nip19.decode(params.id);

    params.id = data.toString();
  }

  const [eventList, setEventList] = useState<Event[]>([]);

  const handleEvent = useCallback(
    (e: Event) => setEventList((oldEvent) => [...oldEvent, e]),
    []
  );

  useEffect(() => {
    const filters: Filter[] = [{ ids: [params.id], kinds: [1], limit: 1 }];

    const subscription = useSubscription(handleEvent, filters);

    return () => subscription.unsub();
  }, []);

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
