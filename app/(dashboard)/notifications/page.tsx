"use client";

import Feed from "@/components/Feed";
import useStore from "@/store";
import {useSubscribe} from "nostr-hooks";

export default function Notifications() {
  const userData = useStore((state) => state.auth.user.data);
  return <Feed showDisplayAs={false} filters={[{ kinds: [1, 6, 7], limit: 100, '#p': [userData?.publicKey || ''] }]} />;
}
