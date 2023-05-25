'use client';

import { usePostEvent, usePostReactions } from '@/hooks';

import { toHexKey } from '@/utils/hexKey';

import useStore from '@/store';

import PostCard from '@/components/Post/PostCard';
import Spinner from '@/components/Spinner';

const PostPage = ({ address }: { address: string }) => {
  const postId = toHexKey(address);
  const userData = useStore((state) => state.auth.user.data);

  const { isFetching, isPostsEmpty } = usePostEvent(postId);
  const { reactionEvents } = usePostReactions(postId);

  if (isPostsEmpty) return <p>No Posts</p>;

  if (isFetching) return <Spinner />;

  return (
    <>
      {!!postId && (
        <PostCard
          key={postId}
          postId={postId}
          externalReactions={reactionEvents}
          showReplies={true}
          standalone={true}
          showReplyForm={!!userData?.publicKey}
        />
      )}
    </>
  );
};

export default PostPage;
