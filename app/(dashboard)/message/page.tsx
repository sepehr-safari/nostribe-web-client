"use client";

import { useMemo, memo } from "react";
import Link from "next/link";
import { nip19 } from "nostr-tools";
import { Avatar, Name } from "@/components";
import { useSubscribe } from 'nostr-hooks';
import useStore from "@/store";

const MessageThread = memo(({ hexPub }: { hexPub: string }) => {
  const npub = nip19.npubEncode(hexPub);
  return (
    <Link href={`/profile/${npub}`} key={hexPub} className="flex items-center p-2 gap-4">
      <Avatar pub={hexPub} width="w-12" />
      <Name pub={hexPub} />
    </Link>
  );
});
MessageThread.displayName = 'MessageThread';

export default function Message() {
  const userData = useStore((state) => state.auth.user.data);
  const { events, eose } = useSubscribe({
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

  const threads = useMemo(() => {
    const threadSet = new Set<string>();
    events.forEach((event) => {
      threadSet.add(event.pubkey);
      event.tags?.forEach((tag) => {
        if (tag[0] === 'p') {
          threadSet.add(tag[1]);
        }
      });
    });
    return threadSet;
  }, [eose]);

  if (!eose) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {Array.from(threads).map((hexPub) => <MessageThread key={hexPub} hexPub={hexPub} />)}
    </div>
  );
}
