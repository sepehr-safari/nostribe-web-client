'use client';

import { useGlobalPosts } from '@/hooks';

import { PostCard, Spinner } from '@/components';

const Feed = () => {
  const { isFetching, isPostsEmpty, postEvents } = useGlobalPosts();

  if (isPostsEmpty) return <p>No Posts</p>;

  if (isFetching) return <Spinner />;

  return (
    <>
      {postEvents.map((postEvent, index) => (
        <PostCard key={`global${postEvent.id}${index}`} postId={postEvent.id} />
      ))}
    </>
  );
};

export default Feed;
