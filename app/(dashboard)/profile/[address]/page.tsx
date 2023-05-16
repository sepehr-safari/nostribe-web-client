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

  const { events, loadMore } = useSubscribe({
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
      <div className="mb-4 -mt-4">
        <ProfileCard profileAddress={params.address} />
      </div>
      <Feed events={events} loadMore={loadMore} />
    </>
  );
};

export default memo(Profile);
