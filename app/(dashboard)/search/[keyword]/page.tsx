"use client";

import Feed from "@/components/Feed";
import {useSubscribe} from "nostr-hooks";
import useStore from "@/store";

export const runtime = 'edge';

const SEARCH_RELAYS = ['wss://relay.nostr.band'];

export default function Search({ params }: { params: { keyword: string }}) {
  const defaultRelays = useStore((store) => store.relays);
  const relays = [...new Set([...defaultRelays, ...SEARCH_RELAYS])];
  const searchTerm = decodeURIComponent(params.keyword).toLowerCase().trim();

  // TODO Feed additionalFilters events.filter((event) => event?.content?.toLowerCase().includes(searchTerm))

  return (
    <>
      <Feed filters={[{ kinds: [1], limit: 100, search: searchTerm }]} relays={relays} />
    </>
  );
}
