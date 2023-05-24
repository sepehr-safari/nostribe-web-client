'use client';

import { memo } from 'react';

import { useProfileHex } from '@/hooks';

import Feed, { FilterOption } from '@/components/Feed';
import ProfileCard from '@/components/ProfileCard';
import { getReplyingToEvent } from '@/utils/event';
import { Event } from 'nostr-tools';

const ProfilePage = ({ address }: { address: string }) => {
  const profileHex = useProfileHex(address);

  if (!profileHex) {
    return null;
  }

  const filterOptions: FilterOption[] = [
    {
      name: 'Posts',
      filter: { kinds: [1], authors: [profileHex], limit: 100 },
      filterFn: (event: Event) => !getReplyingToEvent(event),
    },
    {
      name: 'Posts & replies',
      filter: { kinds: [1, 6], authors: [profileHex], limit: 100 },
    },
    {
      name: 'Likes',
      filter: { kinds: [7], authors: [profileHex], limit: 100 },
    },
  ];

  return (
    <>
      <div className="mb-4 -mt-4">
        <ProfileCard profileAddress={address} />
      </div>
      <Feed filterOptions={filterOptions} />
    </>
  );
};

export default memo(ProfilePage);
