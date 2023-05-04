'use client';

import { memo } from 'react';

import { useProfilePage } from '@/hooks';

import { PostCard, ProfileCard, Spinner } from '@/components';

const Profile = ({ params }: { params: { address: string } }) => {
  const { isFetchingMetadata, isMetadataEmpty, postEvents } = useProfilePage(
    params.address
  );

  if (isMetadataEmpty) return <p>Profile Not Found</p>;

  if (isFetchingMetadata) return <Spinner />;

  return (
    <>
      <ProfileCard profileAddress={params.address} />

      {postEvents.sort((a, b) => b.created_at - a.created_at).map((postEvent, index) => (
        <PostCard
          key={`${params.address}${postEvent.id}${index}`}
          postId={postEvent.id}
        />
      ))}
    </>
  );
};

export default memo(Profile);
