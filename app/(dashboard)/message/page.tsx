"use client";

import { useMemo, memo } from "react";
import Link from "next/link";
import { nip19, Event } from "nostr-tools";
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
    const threadMap = new Map<string, Event>();
    const addIfLatest = (threadId: string, event: Event) => {
      if (!threadMap.has(threadId)) {
        threadMap.set(threadId, event);
      } else {
        const existingEvent = threadMap.get(threadId);
        if ((existingEvent?.created_at || 0) < event.created_at) {
          threadMap.set(threadId, event);
        }
      }
    }
    directMessageEvents.forEach((event) => {
      addIfLatest(event.pubkey, event);
      event.tags?.forEach((tag) => {
        if (tag[0] === 'p') {
          addIfLatest(tag[1], event);
        }
      });
    });
    return Array.from(threadMap.entries())
      .sort((a, b) => b[1].created_at - a[1].created_at)
      .map((entry) => entry[0]);
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
