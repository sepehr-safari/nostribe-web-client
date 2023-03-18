import { Event, Filter } from 'nostr-tools';
import { useEffect, useState } from 'react';

import { useSubscription } from '@/hooks';

export default function useReactions(postId: string) {
  const [likers, setLikers] = useState<Event[]>([]);
  const [zappers, setZappers] = useState<Event[]>([]);
  const [commenters, setCommenters] = useState<Event[]>([]);

  useEffect(() => {
    if (!postId) {
      return;
    }

    const reactionsFilter: Filter[] = [{ kinds: [1, 7, 9735], '#e': [postId] }];

    const sub = useSubscription((e: Event) => {
      if (e.kind === 7) {
        if (e.content === '-') {
          return;
        }

        setLikers((oldLikers) => [...oldLikers, e]);
      } else if (e.kind === 9735) {
        setZappers((oldZappers) => [...oldZappers, e]);
      } else if (e.kind === 1) {
        setCommenters((oldCommenters) => [...oldCommenters, e]);
      }
    }, reactionsFilter);

    return () => {
      sub.unsub();
    };
  }, [postId]);

  return { likers, zappers, commenters };
}
