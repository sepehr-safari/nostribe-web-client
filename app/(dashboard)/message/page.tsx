"use client";

import { useSubscribe } from 'nostr-hooks';
import useStore from "@/store";

export default function Message() {
  const userData = useStore((state) => state.auth.user.data);
  const { events } = useSubscribe({
    relays: ['wss://relay.damus.io', 'wss://relay.snort.social'],
    filters: [
      { authors: [userData?.publicKey || ''], kinds: [4], limit: 10 },
      { kinds: [4], "#p": [userData?.publicKey || '']}
    ],
    options: {
      force: false,
      batchingInterval: 500,
      invalidate: false,
      closeAfterEose: true,
    },
  });

  const threads = new Set<string>();
  events.forEach((event) => {
    threads.add(event.pubkey);
    event.tags?.forEach((tag) => {
      if (tag[0] === 'p') {
        threads.add(tag[1]);
      }
    });
  });

  return (
    <div>
      <h2>Messages</h2>
      {Array.from(threads).map((thread) => (
        <div key={thread}>{thread}</div>
      ))}
    </div>
  );
}
