"use client";

import useNotifications from "@/hooks/posts/simple/useNotifications";
import PostCard from "@/components/Post/PostCard";

export default function Notifications() {
  const { isNotificationsEmpty, notificationEvents } = useNotifications();

  if (isNotificationsEmpty) return <p>No Notifications</p>;

  return (
    <>
      {notificationEvents.sort((a, b) => b.created_at - a.created_at).map((notificationEvent, index) => (
        <PostCard key={`notification${notificationEvent.id}${index}`} postId={notificationEvent.id} />
      ))}
    </>
  );

}
