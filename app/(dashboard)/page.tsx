'use client';

import { memo } from 'react';

import PostCard from '@/components/Post/PostCard';
import NewPostForm from '@/components/NewPostForm';

import { useFeedPage } from '@/hooks';
import useStore from "@/store";

const Feed = () => {
  const {  isPostsEmpty, postEvents } = useFeedPage();
  const userData = useStore((state) => state.auth.user.data);

  if (isPostsEmpty) return <p>No Posts</p>;

  return (
    <>
      {userData?.publicKey ? <NewPostForm /> : null}
      {postEvents.sort((a, b) => b.created_at - a.created_at).map((postEvent, index) => (
        <PostCard key={`global${postEvent.id}${index}`} postId={postEvent.id} />
      ))}
    </>
  );
};

export default memo(Feed);
