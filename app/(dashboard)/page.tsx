'use client';

import { memo } from 'react';

import { PostCard, Spinner } from '@/components';

import { useFeedPage } from '@/hooks';

const Feed = () => {
  const { isFetching, isPostsEmpty, postEvents } = useFeedPage();

  if (isPostsEmpty) return <p>No Posts</p>;

  if (isFetching) return <Spinner />;

  return (
    <>
      {postEvents.map((postEvent, index) => (
        <PostCard key={`global${postEvent.id}${index}`} postId={postEvent.id} />
      ))}
    </>
  );
};

export default memo(Feed);
