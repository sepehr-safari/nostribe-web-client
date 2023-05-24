'use client';

import {memo} from 'react';

import {useProfileContent, useProfileHex} from '@/hooks';

import ProfileCard from '@/components/ProfileCard';
import Feed, {FilterOption} from '@/components/Feed';
import {useSubscribe} from "nostr-hooks";
import useStore from "@/store";
import {Event} from "nostr-tools";
import {getReplyingToEvent} from "@/utils/event";

const Profile = ({ params }: { params: { address: string } }) => {
  const profileHex = useProfileHex(params.address);
  const {
    nip05,
  } = useProfileContent(profileHex);

  if (!profileHex) {
    return null;
  }

  if (nip05) {
    const data = { ...window.history.state };
    if (nip05.endsWith('@iris.to')) {
      window.history.replaceState(data, '', `/${nip05.split('@')[0]}`);
    }
    else {
      window.history.replaceState(data, '', `/${nip05}`);
    }
  }

  const filterOptions: FilterOption[] = [
    { name: 'Posts', filter: { kinds: [1], authors: [profileHex], limit: 100 }, filterFn: (event: Event) => !getReplyingToEvent(event) },
    { name: 'Posts & replies', filter: { kinds: [1, 6], authors: [profileHex], limit: 100 }},
    { name: 'Likes', filter: { kinds: [7], authors: [profileHex], limit: 100 }},
  ];

  return (
    <>
      <div className="mb-4 -mt-4">
        <ProfileCard profileAddress={params.address} />
      </div>
      <Feed filterOptions={filterOptions} />
    </>
  );
};

export default memo(Profile);
