'use client';

import { memo } from 'react';

import Link from 'next/link';

import { nip19 } from 'nostr-tools';

import {useProfileContacts} from '@/hooks';

import Avatar from '@/components/Avatar';
import Name from '@/components/Name';

const Profile = ({ params }: { params: { address: string } }) => {
  const {
    isContactsEmpty,
    contactEvents,
  } = useProfileContacts(params.address);

  if (isContactsEmpty) return <p>Contacts list not found</p>;

  const event = contactEvents[0];

  // TODO sort

  return (
    <div className="flex flex-col gap-4 p-2">
      {event.tags?.filter((tag) => tag[0] === "p").map((tag, index) => (
        <Link href={`/profile/${nip19.npubEncode(tag[1])}`} key={tag[1]} className="flex gap-4 items-center">
          <Avatar pub={tag[1]} />
          <Name pub={tag[1]} />
        </Link>
      ))}
    </div>
  );
};

export default memo(Profile);
