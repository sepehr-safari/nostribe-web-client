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

    return () => {
      clearFeed();
      document.title = `Nostribe`;
    };
  }, [params.address, clearFeed, fetchFeed]);

  if (!data || !data.author || !data.posts) {
    if (isFetching) {
      return <Spinner />;
    }

    return <>Profile Not Found!</>;
  }

  const content = data.author.event?.content || '{}';
  const { display_name, name } = JSON.parse(content);
  const displayName = display_name || name;

  document.title = `${displayName} | Nostribe`;

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
