'use client';

import { PostCard } from '@/components';

import { usePosts } from '@/hooks';

export default function Feed() {
  const posts = usePosts();

  return (
    <>
      {posts &&
        posts.map((post, index: number) => (
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
