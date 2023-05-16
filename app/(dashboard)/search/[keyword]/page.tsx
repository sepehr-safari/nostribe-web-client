"use client";

import Feed from "@/components/Feed";
import {useSubscribe} from "nostr-hooks";
import useStore from "@/store";
import {Event } from "nostr-tools";

export const runtime = 'edge';

const SEARCH_RELAYS = ['wss://relay.nostr.band'];

export default function Search({ params }: { params: { keyword: string }}) {
  const defaultRelays = useStore((store) => store.relays);
  const relays = [...new Set([...SEARCH_RELAYS, ...defaultRelays])];
  const searchTerm = decodeURIComponent(params.keyword).toLowerCase().trim();

  console.log('filters', [{ kinds: [1], limit: 100, search: searchTerm }]);

  const filters = [{ kinds: [1], limit: 100, search: searchTerm }];
  const filterFn = (event: Event) => event?.content?.toLowerCase().includes(searchTerm);

  return (
    <>
      <Feed filters={filters} filterFn={filterFn} relays={relays} />
    </>
  );
}
