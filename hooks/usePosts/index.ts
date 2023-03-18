import { IPost } from '@/types';
import { Event, Filter } from 'nostr-tools';
import { useEffect, useState } from 'react';
import { useSubscription } from '@/hooks';

export default function usePosts(filter?: Filter) {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const latestNotesFilter: Filter[] = [
      { ...filter, kinds: [1], limit: filter?.limit || 5 },
    ];

    const sub = useSubscription((e: Event) => {
      setPosts((oldPosts) => [
        ...oldPosts,
        { id: e.id, content: e.content, author: { id: e.pubkey } },
      ]);
    }, latestNotesFilter);

    return () => {
      sub.unsub();
    };
  }, [filter]);

  return posts;
}
