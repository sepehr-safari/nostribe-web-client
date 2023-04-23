'use client';

import { memo } from 'react';

import { useProfileHex } from '@/hooks';

import { ProfilePage, Spinner } from '@/components';

const Profile = ({ params }: { params: { address: string } }) => {
  const profileHex = useProfileHex(params.address);

  if (!profileHex) {
    return <Spinner />;
  }

  return (
    <>
      <ProfilePage profileHex={profileHex} />
    </>
  );
};

export default memo(Profile);
