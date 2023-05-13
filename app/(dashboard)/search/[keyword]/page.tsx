"use client";

import Feed from "@/components/Feed";
import {useSubscribe} from "nostr-hooks";
import useStore from "@/store";

const SEARCH_RELAYS = ['wss://relay.nostr.band'];

export default function Search({ params }: { params: { keyword: string }}) {
  let relays = useStore((store) => store.relays);
  relays = [...new Set([...SEARCH_RELAYS, ...relays])];
  const searchTerm = decodeURIComponent(params.keyword).toLowerCase().trim();
  const { events, eose } = useSubscribe({
    relays,
    filters: [{ kinds: [1], limit: 100, search: searchTerm }],
    options: { invalidate: true },
  });

  const isPostsEmpty = eose && !events.length;

  if (isPostsEmpty) return <p>No Results for "{searchTerm}"</p>;

  return (
    <>
      <Feed events={events.filter((event) => event?.content?.toLowerCase().includes(searchTerm))} />
    </>
  );
}
