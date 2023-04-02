'use client';

import { memo, useEffect } from 'react';

import { PostCard, ProfileCard, Spinner } from '@/components';

import useStore from '@/store';

function Profile({ params }: { params: { address: string } }) {
  const { clear, data, error, fetchProfile, isLoading } = useStore(
    (state) => state.profile
  );

  useEffect(() => {
    fetchProfile(params.address);

    return () => clear();
  }, [params.address]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <>{error}</>;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <ProfileCard metadata={data.metadata} contacts={data.contacts} />

      {data.posts.map((post, index) => (
        <PostCard key={index} metadata={data.metadata} event={post} />
      ))}
    </>
  );
}

export default memo(Profile);
