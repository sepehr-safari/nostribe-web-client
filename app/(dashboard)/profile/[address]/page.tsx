'use client';

import { memo } from 'react';

import { useProfilePage } from '@/hooks';

import PostCard from '@/components/Post/PostCard';
import ProfileCard from '@/components/ProfileCard';

const Profile = ({ params }: { params: { address: string } }) => {
  const { postEvents } = useProfilePage(
    params.address
  );

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
