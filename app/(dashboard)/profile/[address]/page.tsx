'use client';

import { memo, useEffect } from 'react';

import { PostCard, ProfileCard, Spinner } from '@/components';

import { getProfileHex } from '@/utils';

import useStore from '@/store';

const Profile = ({ params }: { params: { address: string } }) => {
  const { clearFeed, data, fetchFeed, isFetching } = useStore(
    (state) => state.feed
  );

  useEffect(() => {
    getProfileHex(params.address).then((profileHex) =>
      fetchFeed({ author: profileHex })
    );

    return () => clearFeed();
  }, [params.address, clearFeed, fetchFeed]);

  if (!data || !data.author || !data.posts) {
    if (isFetching) {
      return <Spinner />;
    }

    return <>Profile Not Found!</>;
  }

  return (
    <>
      <ProfileCard data={data.author} />

      {data.posts.map((postEvent, index) => (
        <PostCard key={index} data={postEvent} />
      ))}
    </>
  );
};

export default memo(Profile);
