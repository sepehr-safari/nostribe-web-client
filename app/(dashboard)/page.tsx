'use client';

import { Event } from 'nostr-tools';

import { getReplyingToEvent } from '@/utils/event';

import { useProfileContacts } from '@/hooks';

import useStore from '@/store';

import Feed from '@/components/Feed';
import FollowSuggestions from '@/components/FollowSuggestions';
import NewPostForm from '@/components/NewPostForm';

const DEFAULT_PUBKEY =
  '4523be58d395b1b196a9b8c82b038b6895cb02b683d0c253a955068dba1facd0';

const HomeFeed = () => {
  const userData = useStore((state) => state.auth.user.data);
  const { latestContactEvent } = useProfileContacts(
    userData?.publicKey || DEFAULT_PUBKEY
  );
  const authors =
    latestContactEvent?.tags
      ?.filter((tag) => tag[0] === 'p')
      .map((tag) => tag[1]) || [];
  if (userData?.publicKey) {
    authors.push(userData.publicKey);
  }

  const filterOptions = [
    {
      name: 'Posts',
      filter: {
        kinds: [1],
        authors,
        limit: 100,
      },
      filterFn: (event: Event) => !getReplyingToEvent(event),
    },
    {
      name: 'Posts & replies',
      filter: {
        kinds: [1, 6],
        authors,
        limit: 100,
      },
    },
  ];

  // TODO pops up slowly with isContactsEmpty. maybe save isNewUser state after signup?
  return (
    <>
      {userData?.publicKey && authors.length === 1 && <FollowSuggestions />}
      {userData?.publicKey ? (
        <div className="hidden md:block">
          <NewPostForm />
        </div>
      ) : null}
      <Feed filterOptions={filterOptions} />
    </>
  );
};

export default HomeFeed;
