"use client";

import Feed from "@/components/Feed";
import useStore from "@/store";
import {useSubscribe} from "nostr-hooks";

export default function Notifications() {
  const relays = useStore((store) => store.relays);
  const userData = useStore((state) => state.auth.user.data);

  const { events: notificationEvents, eose: notificationEose } = useSubscribe({
    relays,
    filters: [{ kinds: [1, 6, 7], limit: 100, '#p': [userData?.publicKey || ''] }],
  });

  const isNotificationsEmpty = notificationEose && !notificationEvents.length;

  if (isNotificationsEmpty) return <p>No Notifications</p>;

  return <Feed showDisplayAs={false} events={notificationEvents.filter((e) => e.pubkey !== userData?.publicKey)} />;
}
