"use client";

import Feed from "@/components/Feed";
import useStore from "@/store";
import {Event} from "nostr-tools";

export default function Notifications() {
  const userData = useStore((state) => state.auth.user.data);
  const filters = userData?.publicKey ? [{ kinds: [1, 6, 7], limit: 100, '#p': [userData?.publicKey || ''] }] : [];
  const filterFn = (event: Event) => event?.pubkey !== userData?.publicKey;
  return <Feed showDisplayAs={false} filters={filters} filterFn={filterFn} />;
}
