"use client";

import useNotifications from "@/hooks/posts/simple/useNotifications";
import PostCard from "@/components/PostCard";
import Spinner from "@/components/Spinner";

export default function Notifications() {
  const { isNotificationsEmpty, isFetching, notificationEvents } = useNotifications();

  if (isNotificationsEmpty) return <p>No Notifications</p>;

  if (isFetching) return <Spinner />;

  return (
    <>
      {notificationEvents.sort((a, b) => b.created_at - a.created_at).map((notificationEvent, index) => (
        <PostCard key={`notification${notificationEvent.id}${index}`} postId={notificationEvent.id} />
      ))}
    </>
  );

}
