'use client';

import { memo } from 'react';

import { usePostEvent, usePostHex } from '@/hooks';

import { PostCard, Spinner } from '@/components';

const Post = ({ params }: { params: { address: string } }) => {
  const postId = usePostHex(params.address);

  const { isFetching, isPostsEmpty } = usePostEvent(postId);

  if (isPostsEmpty) return <p>No Posts</p>;

  if (isFetching) return <Spinner />;

  return <>{!!postId && <PostCard key={postId} postId={postId} />}</>;
};

export default Post;
