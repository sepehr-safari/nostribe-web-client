'use client';

import { nip19 } from 'nostr-tools';
import { memo, useEffect } from 'react';

import { PostCard, Spinner } from '@/components';

import useStore from '@/store';

function Post({ params }: { params: { address: string } }) {
  if (params.address.startsWith('note')) {
    const { data } = nip19.decode(params.address);

    params.address = data.toString();
  }

  const { clear, data, error, fetchFeed, isLoading } = useStore(
    (state) => state.feed
  );

  useEffect(() => {
    fetchFeed({ ids: [params.address] });

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
      {data.posts.map((event, index) => (
        <PostCard key={index} event={event} metadata={event.metadata} />
      ))}
    </>
  );
}

export default memo(Post);
