import { Event, Filter } from 'nostr-tools';
import { useEffect, useState } from 'react';

import { useSubscription } from '@/hooks';

import { IAuthor } from '@/types';

export default function useAuthor(pubkey: string) {
  const initialAuthor = {
    id: pubkey,
    picture: '/Nostribe.png',
    name: 'unknown',
    nip05: 'NA',
    banner: '/Nostribe.png',
    lud06: '',
    website: '',
    about: '',
  };

  const [author, setAuthor] = useState<IAuthor>(initialAuthor);

  useEffect(() => {
    if (!author) {
      return;
    }

    const authorMetadataFilter: Filter = { authors: [pubkey], kinds: [0] };

    const sub = useSubscription(
      (e: Event) => {
        const content = JSON.parse(e.content);

        if (content) {
          setAuthor({
            id: content.id,
            name: content.name,
            nip05: content.nip05,
            picture: content.picture,
            about: content.about,
            banner: content.banner,
            website: content.website,
            lud06: content.lud06,
          });
        }
      },
      [authorMetadataFilter]
    );

    return () => {
      sub.unsub();
    };
  }, [pubkey]);

  return author;
}
