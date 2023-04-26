'use client';

import { memo, useEffect } from 'react';

import { useProfileContent, useProfilePosts } from '@/hooks';

import { PostCard, ProfileCard, Spinner } from '@/components';

const Profile = ({ params }: { params: { address: string } }) => {
  const { displayName, isFetchingMetadata, isMetadataEmpty } =
    useProfileContent(params.address);

  const { postEvents } = useProfilePosts(params.address);

  useEffect(() => {
    document.title = displayName ? `${displayName} | Nostribe` : 'Nostribe';

    return () => {
      document.title = 'Nostribe';
    };
  }, [displayName]);

  if (isMetadataEmpty) return <p>Profile Not Found</p>;

  if (isFetchingMetadata) return <Spinner />;

  return (
    <>
      <ProfileCard profileAddress={params.address} />

      {postEvents.map((postEvent, index) => (
        <PostCard
          key={`${params.address}${postEvent.id}${index}`}
          postId={postEvent.id}
        />
      ))}
    </>
  );
};

export default Profile;
