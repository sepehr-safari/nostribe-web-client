'use client';

import { memo } from 'react';

import { useProfilePage } from '@/hooks';

import ProfileCard from '@/components/ProfileCard';
import Feed from '@/components/Feed';

const Profile = ({ params }: { params: { address: string } }) => {
  const { postEvents } = useProfilePage(
    params.address
  );

  return (
    <>
      <ProfileCard profileAddress={params.address} />

      <Feed events={postEvents} />
    </>
  );
};

export default memo(Profile);
