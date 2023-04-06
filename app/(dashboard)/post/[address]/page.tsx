'use client';

import { nip19 } from 'nostr-tools';
import { memo, useEffect } from 'react';

import { PostCard, Spinner } from '@/components';

import useStore from '@/store';

const Post = ({ params }: { params: { address: string } }) => {
  const { clearFeed, data, fetchFeed, isFetching } = useStore(
    (state) => state.feed
  );

  useEffect(() => {
    const id = params.address.startsWith('note')
      ? nip19.decode(params.address).data.toString()
      : params.address;

    fetchFeed({ id });

    return () => clearFeed();
  }, [params.address, fetchFeed, clearFeed]);

  if (!data || !data.posts) {
    if (isFetching) {
      return <Spinner />;
    }

    return <>Post Not Found</>;
  }

  return (
    <>
      {data.posts.map((post, index) => (
        <PostCard key={index} data={post} />
      ))}
    </>
  );
};

export default memo(Post);
