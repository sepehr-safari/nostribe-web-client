'use client';

import { memo } from 'react';

import Link from 'next/link';

import { nip19 } from 'nostr-tools';
import { useState, useEffect } from 'react';

import { Avatar, Name } from '@/components';

const Profile = ({ params }: { params: { address: string } }) => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    fetch(`https://rbr.bio/${params.address}/followers.json`).then((res) => {
      res.json().then((data) => {
        setFollowers(data);
      });
    }).catch((err) => {
      console.log(err);
    });
  });

  return (
    <div className="flex flex-col gap-4 my-2">
      {followers.map((follower) => (
        <Link href={`/profile/${nip19.npubEncode(follower)}`} key={follower} className="flex gap-4 items-center">
          <Avatar pub={follower} />
          <Name pub={follower} />
        </Link>
      ))}
    </div>
  );
};

export default memo(Profile);
