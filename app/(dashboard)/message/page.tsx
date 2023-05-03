"use client";

import { useMemo, memo } from "react";
import Link from "next/link";
import { nip19 } from "nostr-tools";
import { Avatar, Name } from "@/components";
import useDirectMessages from "@/hooks/posts/simple/useDirectMessages";

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
  const { directMessageEvents, directMessageEose, isDirectMessagesEmpty } = useDirectMessages();

  const threads = useMemo(() => {
    const threadSet = new Set<string>();
    directMessageEvents.forEach((event) => {
      threadSet.add(event.pubkey);
      event.tags?.forEach((tag) => {
        if (tag[0] === 'p') {
          threadSet.add(tag[1]);
        }
      });
    });
    return threadSet;
  }, [directMessageEose]);

  if (!directMessageEose) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (isDirectMessagesEmpty) {
    return (
      <div>
        <p>No messages found.</p>
      </div>
    );
  }

  return (
    <div>
      {Array.from(threads).map((hexPub) => <MessageThread key={hexPub} hexPub={hexPub} />)}
    </div>
  );
}
