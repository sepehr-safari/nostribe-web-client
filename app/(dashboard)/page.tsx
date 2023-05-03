'use client';

import { memo } from 'react';

import { PostCard, Spinner, NewPostForm } from '@/components';

import { useFeedPage } from '@/hooks';

const Feed = () => {
  const { isFetching, isPostsEmpty, postEvents } = useFeedPage();

  if (isPostsEmpty) return <p>No Posts</p>;

  if (isFetching) return <Spinner />;

  return (
    <>
      <NewPostForm />
      {postEvents.map((postEvent, index) => (
        <PostCard key={`global${postEvent.id}${index}`} postId={postEvent.id} />
      ))}
    </>
  );
};

export default memo(Feed);
