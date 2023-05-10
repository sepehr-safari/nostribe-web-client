"use client";

import Feed from "@/components/Feed";
import {useSubscribe} from "nostr-hooks";

const SEARCH_RELAYS = ['wss://relay.nostr.band'];

export default function Search({ params }: { params: { keyword: string }}) {
  const searchTerm = params.keyword.toLowerCase().trim();
  const { events, eose } = useSubscribe({
    relays: SEARCH_RELAYS,
    filters: [{ kinds: [1], limit: 200, search: searchTerm }],
    options: { invalidate: true },
  });

  const isPostsEmpty = eose && !events.length;

  if (isPostsEmpty) return <p>No Results for "{searchTerm}"</p>;

  return (
    <>
      <h2>Search: "{searchTerm}"</h2>
      <Feed events={events} />
    </>
  );
}
