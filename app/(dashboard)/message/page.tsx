"use client";

import Link from "next/link";
import { nip19 } from "nostr-tools";
import { Avatar, Name } from "@/components";
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
      {Array.from(threads).map((thread) => {
        const npub = nip19.npubEncode(thread);
        return (
          <Link href={`/profile/${npub}`} key={thread} className="flex items-center p-2 gap-4">
            <Avatar pub={thread} width="w-12" />
            <Name pub={thread} />
          </Link>
        );
      })}
    </div>
  );
}
