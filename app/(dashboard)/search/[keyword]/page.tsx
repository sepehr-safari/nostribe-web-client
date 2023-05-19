"use client";

import Feed from "@/components/Feed";
import useStore from "@/store";
import {Event, Filter } from "nostr-tools";

export const runtime = 'edge';

const SEARCH_RELAYS = ['wss://relay.nostr.band'];

export default function Search({ params }: { params: { keyword: string }}) {
  const defaultRelays = useStore((store) => store.relays);
  const relays = [...new Set([...SEARCH_RELAYS, ...defaultRelays])];
  const searchTerm = decodeURIComponent(params.keyword).toLowerCase().trim();

  const filter: Filter = { kinds: [1], limit: 100, search: searchTerm };
  const filterFn = (event: Event) => event?.content?.toLowerCase().includes(searchTerm);
  const filterOptions = [
    { name: 'Search', filter, filterFn },
  ];

  return (
    <>
      <Feed filterOptions={filterOptions} relays={relays} />
    </>
  );
}
