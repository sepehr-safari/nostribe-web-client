'use client';

import { useNostrSubscribe } from 'nostr-hooks';
import { nip19 } from 'nostr-tools';

import useStore from '@/store';

const usePostEvent = (postId: string) => {
  const relays = useStore((store) => store.relays);

  const { events: postEvents, eose: postEose } = useNostrSubscribe({
    relays,
    filters: [{ ids: [postId] }],
  });

  const isFetching = !postEose && !postEvents.length;
  const isPostsEmpty = postEose && !postEvents.length;

  const createdAt = postEvents.length
    ? new Date(postEvents[0].created_at * 1000)
    : 0;
  const nip19NoteId = postEvents.length
    ? nip19.noteEncode(postEvents[0].id)
    : '';

  return {
    postEvent: postEvents[0],
    postEose,
    isFetching,
    isPostsEmpty,
    createdAt,
    nip19NoteId,
  };
};

export default usePostEvent;
