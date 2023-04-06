'use client';

import { memo, useEffect } from 'react';

import { PostCard, Spinner } from '@/components';

import useStore from '@/store';

const Feed = () => {
  const { clearFeed, data, fetchFeed } = useStore((state) => state.feed);

  useEffect(() => {
    fetchFeed();

    return () => clearFeed();
  }, [fetchFeed, clearFeed]);

  if (!data || !data.posts) {
    return <Spinner />;
  }

  return (
    <>
      {data.posts.map((postData, index) => (
        <PostCard key={index} data={postData} />
      ))}
    </>
  );
};

export default memo(Feed);
