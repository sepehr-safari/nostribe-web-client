'use client';

import { memo } from 'react';

import { usePostPage } from '@/hooks';

import PostCard from '@/components/PostCard';
import Spinner from '@/components/Spinner';

const Post = ({ params }: { params: { address: string } }) => {
  const { postId, isFetching, isPostsEmpty } = usePostPage(params.address);

  if (isPostsEmpty) return <p>No Posts</p>;

  if (isFetching) return <Spinner />;

  return <>{!!postId && <PostCard key={postId} postId={postId} showReplies={Infinity} />}</>;
};

export default memo(Post);
