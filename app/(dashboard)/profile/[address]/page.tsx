import ProfilePage from '@/components/ProfilePage';

const Profile = ({ params }: { params: { address: string } }) => {
  return (
    <>
      <ProfilePage address={params.address} />
    </>
  );
};

export default Profile;
