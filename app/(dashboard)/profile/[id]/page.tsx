'use client';

import { nip05, nip19 } from 'nostr-tools';
import { useEffect, useMemo, useState } from 'react';

import { PostCard, ProfileCard } from '@/components';

import { usePosts } from '@/hooks';

export default function Profile({ params }: { params: { id: string } }) {
  const [pubkey, setPubkey] = useState<string>(params.id);

  useEffect(() => {
    // nip05
    if (params.id.includes('%40')) {
      nip05
        .queryProfile(params.id.replace('%40', '@'))
        .then((profile) => profile?.pubkey && setPubkey(profile.pubkey));
    } else if (params.id.startsWith('npub1')) {
      // nip19
      const { data } = nip19.decode(params.id);
      setPubkey(data.toString());
    }
  }, []);

  const filter = useMemo(() => ({ authors: [pubkey] }), [pubkey]);

  const posts = usePosts(filter);

  return (
    <>
      <ProfileCard id={pubkey} />

      {posts &&
        posts.map((post, index) => (
          <PostCard
            key={index}
            id={post.id}
            content={post.content}
            pubkey={post.author.id}
          />
        ))}
    </>
  );
}
