'use client';

import { memo } from 'react';

import Link from 'next/link';

import { nip19 } from 'nostr-tools';
import { useState, useEffect } from 'react';

import Avatar from '@/components/Avatar';
import Name from '@/components/Name';
import FollowButton from "@/components/FollowButton";
import {useProfileHex} from "@/hooks";

const Profile = ({ params }: { params: { address: string } }) => {
  const [followers, setFollowers] = useState([]);
  const hex = useProfileHex(params.address);

  useEffect(() => {
    hex && fetch(`https://rbr.bio/${hex}/followers.json`).then((res) => {
      res.json().then((data) => {
        setFollowers(data);
      });
    }).catch((err) => {
      console.log(err);
    });
  }, [hex]);

  return (
    <div className="flex flex-col gap-4 p-2">
      {followers.map((follower) => (
        <div key={follower} className="flex items-center w-full justify-between">
          <Link href={`/${nip19.npubEncode(follower)}`} className="flex gap-4 items-center">
            <Avatar pub={follower} />
            <Name pub={follower} />
          </Link>
          <FollowButton pub={follower} />
        </div>
      ))}
    </div>
  );
};

export default memo(Profile);
