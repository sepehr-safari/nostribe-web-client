'use client';

import { memo } from 'react';

import Link from 'next/link';

import { nip19 } from 'nostr-tools';

import {useProfileContacts} from '@/hooks';

import { Avatar, Name, Spinner } from '@/components';

const Profile = ({ params }: { params: { address: string } }) => {
  const {
    isFetchingContacts,
    isContactsEmpty,
    contactEvents,
  } = useProfileContacts(params.address);

  if (isContactsEmpty) return <p>Contacts list not found</p>;

  if (isFetchingContacts) return <Spinner />;

  const event = contactEvents[0];

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
