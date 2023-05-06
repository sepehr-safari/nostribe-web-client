'use client';

import { memo } from 'react';

import Link from 'next/link';

import { nip19 } from 'nostr-tools';

import {useProfileContacts} from '@/hooks';

import Avatar from '@/components/Avatar';
import Name from '@/components/Name';
import FollowButton from '@/components/FollowButton';

const Profile = ({ params }: { params: { address: string } }) => {
  const {
    isContactsEmpty,
    latestContactEvent,
  } = useProfileContacts(params.address);

  if (isContactsEmpty) return <p>Contacts list not found</p>;

  // TODO sort

  return (
    <div className="flex flex-col gap-4 p-2">
      {latestContactEvent?.tags?.filter((tag) => tag[0] === "p").map((tag, index) => (
        <div className="flex items-center w-full justify-between">
          <Link href={`/profile/${nip19.npubEncode(tag[1])}`} key={tag[1]} className="flex gap-4 items-center">
            <Avatar pub={tag[1]} />
            <Name pub={tag[1]} />
          </Link>
          <FollowButton pub={tag[1]} />
        </div>
      ))}
    </div>
  );
};

export default memo(Profile);
