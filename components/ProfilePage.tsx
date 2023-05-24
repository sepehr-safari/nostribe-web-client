'use client';

import {memo, useEffect} from 'react';

import {useProfileContent, useProfileHex} from '@/hooks';

import Feed, { FilterOption } from '@/components/Feed';
import ProfileCard from '@/components/ProfileCard';
import { getReplyingToEvent } from '@/utils/event';
import {Event, nip05} from 'nostr-tools';

const ProfilePage = ({ address }: { address: string }) => {
  const profileHex = useProfileHex(address);

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
          window.history.replaceState(data, '', `/${nip05addr.replace(/^_@/, '')}`);
        }
      });
    }
  }, [nip05addr]);

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
