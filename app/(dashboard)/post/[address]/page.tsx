'use client';

import { memo } from 'react';

import { usePostPage } from '@/hooks';

import PostCard from '@/components/Post/PostCard';
import Spinner from '@/components/Spinner';
import useStore from "@/store";

const Post = ({ params }: { params: { address: string } }) => {
  const { postId, isFetching, isPostsEmpty } = usePostPage(params.address);
  const userData = useStore((state) => state.auth.user.data);

  if (isPostsEmpty) return <p>No Posts</p>;

  if (isFetching) return <Spinner />;

  return <>{!!postId && <PostCard key={postId} postId={postId} showReplies={Infinity} standalone={true} showReplyForm={!!userData?.publicKey} />}</>;
};

export default memo(Post);
