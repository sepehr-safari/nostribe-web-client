"use client";

import { useMemo } from "react";
import { Event } from "nostr-tools";
import useDirectMessages from "@/hooks/posts/simple/useDirectMessages";
import useStore from "@/store";

import DirectMessage from "@/components/DirectMessage";

export default function ChatList() {
  const { directMessageEvents, isDirectMessagesEmpty } = useDirectMessages();
  const userData = useStore((state) => state.auth.user.data);

  const {threads, latest} = useMemo(() => {
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
    const sortedThreads = Array.from(threadMap.entries())
      .sort((a, b) => b[1].created_at - a[1].created_at)
      .map((entry) => entry[0]);
    return { threads: sortedThreads, latest: threadMap };
  }, [directMessageEvents, userData]);

  if (isDirectMessagesEmpty) {
    return (
      <div className="p-2">
        <p>No messages found.</p>
      </div>
    );
  }

  return (
    <div className="p-2 break-all">
      {Array.from(threads).map((hexPub) => <DirectMessage limitText={70} key={hexPub} hexPub={hexPub} event={latest.get(hexPub) as Event}  />)}
    </div>
  );
}
