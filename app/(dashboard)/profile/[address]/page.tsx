'use client';

import ProfilePage from '@/components/ProfilePage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'edge';

const Profile = ({ params }: { params: { address: string } }) => {
  return (
    <>
      <ProfilePage address={params.address} />
    </>
  );
};

export default Profile;
