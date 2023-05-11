"use client";

import useNotifications from "@/hooks/posts/simple/useNotifications";
import PostCard from "@/components/Post/PostCard";
import Feed from "@/components/Feed";
import useStore from "@/store";

export default function Notifications() {
  const { isNotificationsEmpty, notificationEvents } = useNotifications();
  const userData = useStore((state) => state.auth.user.data);

  if (isNotificationsEmpty) return <p>No Notifications</p>;

  return <Feed showDisplayAs={false} events={notificationEvents.filter((e) => e.pubkey !== userData?.publicKey)} />;

}
