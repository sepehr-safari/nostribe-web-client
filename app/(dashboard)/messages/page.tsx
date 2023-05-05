"use client";

import { useMemo, memo } from "react";
import Link from "next/link";
import { nip19, Event } from "nostr-tools";
import Avatar from "@/components/Avatar";
import Name from "@/components/Name";
import Spinner from "@/components/Spinner";
import useDirectMessages from "@/hooks/posts/simple/useDirectMessages";
import useStore from "@/store";

const MessageListItem = memo(({ hexPub }: { hexPub: string }) => {
  const npub = nip19.npubEncode(hexPub);
  return (
    <Link href={`/messages/${npub}`} key={hexPub} className="flex items-center p-2 gap-4">
      <Avatar pub={hexPub} width="w-12" />
      <Name pub={hexPub} />
    </Link>
  );
});
MessageListItem.displayName = 'MessageListItem';

export default function Message() {
  const { directMessageEvents, directMessageEose, isDirectMessagesEmpty } = useDirectMessages();
  const userData = useStore((state) => state.auth.user.data);

  const threads = useMemo(() => {
    const threadMap = new Map<string, Event>();
    const addIfLatest = (threadId: string, event: Event) => {
      if (threadId === userData?.publicKey) {
        const isNoteToSelf = !event.tags
          || event.tags.length === 0
          || (event.tags.length === 1 && event.tags[0][0] === 'p' && event.tags[0][1] === userData?.publicKey);
        if (!isNoteToSelf) {
          return;
        }
      }
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
  }, [directMessageEose, userData]);

  if (!directMessageEose) {
    return (
      <div className="flex p-2 justify-center">
        <Spinner />
      </div>
    );
  }

  if (isDirectMessagesEmpty) {
    return (
      <div className="p-2">
        <p>No messages found.</p>
      </div>
    );
  }

  return (
    <div className="p-2">
      {Array.from(threads).map((hexPub) => <MessageListItem key={hexPub} hexPub={hexPub} />)}
    </div>
  );
}
