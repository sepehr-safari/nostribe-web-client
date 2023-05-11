'use client';

import {memo} from 'react';

import {useProfileHex} from '@/hooks';

import ProfileCard from '@/components/ProfileCard';
import Feed from '@/components/Feed';
import {useSubscribe} from "nostr-hooks";
import useStore from "@/store";

const Profile = ({ params }: { params: { address: string } }) => {
  const profileHex = useProfileHex(params.address);
  const relays = useStore((store) => store.relays);

  const { events } = useSubscribe({
    relays,
    filters: [
      {
        authors: [profileHex],
        kinds: [1],
        limit: 100,
      }
    ],
    options: { enabled: !!profileHex, invalidate: true },
  });
  
  return (
    <>
      <ProfileCard profileAddress={params.address} />

      <Feed events={events} />
    </>
  );
};

export default memo(Profile);
