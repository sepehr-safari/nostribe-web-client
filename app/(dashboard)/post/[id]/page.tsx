'use client';

import { nip19 } from 'nostr-tools';
import { useEffect, useMemo, useState } from 'react';

import { PostCard, ProfileCard } from '@/components';

import { usePosts } from '@/hooks';

export default function Post({ params }: { params: { id: string } }) {
  const [postId, setPostId] = useState<string>(params.id);

  useEffect(() => {
    if (params.id.startsWith('note')) {
      // nip19
      const { data } = nip19.decode(params.id);
      setPostId(data.toString());
    }
  }, []);

  const filter = useMemo(() => ({ ids: [postId], limit: 1 }), [postId]);

  const posts = usePosts(filter);

  return (
    <>
      {posts &&
        posts.map((post, index) => (
          <ProfileCard key={index} id={post.author.id} />
        ))}

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
