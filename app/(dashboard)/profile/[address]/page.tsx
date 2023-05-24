'use client';

import {memo, useEffect} from 'react';

import {useProfileContent, useProfileHex} from '@/hooks';

import ProfileCard from '@/components/ProfileCard';
import Feed, {FilterOption} from '@/components/Feed';
import {Event, nip05} from "nostr-tools";
import {getReplyingToEvent} from "@/utils/event";

const Profile = ({ params }: { params: { address: string } }) => {
  const profileHex = useProfileHex(params.address);
  const {
    nip05: nip05addr,
  } = useProfileContent(profileHex);

  useEffect(() => {
    if (nip05addr) {
      nip05.queryProfile(nip05addr).then((profile) => {
        if (!profile) {
          return;
        }
        const data = { ...window.history.state };
        if (nip05addr.endsWith('@iris.to')) {
          window.history.replaceState(data, '', `/${nip05addr.split('@')[0]}`);
        }
        else {
          window.history.replaceState(data, '', `/${nip05addr}`);
        }
      });
    }
  });

  if (!profileHex) {
    return null;
  }

  const filterOptions: FilterOption[] = [ // TODO useSubscribe doesn't react to filter change, so we temporarily use kinds [1, 6, 7] and let filterFn do the rest
    { name: 'Posts', filter: { kinds: [1, 6, 7], authors: [profileHex], limit: 100 }, filterFn: (event: Event) => !getReplyingToEvent(event) },
    { name: 'Posts & replies', filter: { kinds: [1, 6], authors: [profileHex], limit: 100 }, filterFn: (event: Event) => [1,6].includes(event.kind)},
    { name: 'Likes', filter: { kinds: [7], authors: [profileHex], limit: 100 }, filterFn: (event: Event) => event.kind === 7 },
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
