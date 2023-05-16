'use client';

import {memo} from 'react';

import {useProfileHex} from '@/hooks';

import ProfileCard from '@/components/ProfileCard';
import Feed from '@/components/Feed';
import {useSubscribe} from "nostr-hooks";
import useStore from "@/store";

const Profile = ({ params }: { params: { address: string } }) => {
  const profileHex = useProfileHex(params.address);

  if (!profileHex) {
    return null;
  }

  const filters = [
    {
      authors: [profileHex],
      kinds: [1],
      limit: 20,
    }
  ];

  return (
    <>
      <div className="mb-4 -mt-4">
        <ProfileCard profileAddress={params.address} />
      </div>
      <Feed filters={filters} />
    </>
  );
};

export default memo(Profile);
