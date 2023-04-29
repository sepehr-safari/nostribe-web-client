'use client';

import { memo } from 'react';

import { usePostPage } from '@/hooks';

import { PostCard, Spinner } from '@/components';

const Post = ({ params }: { params: { address: string } }) => {
  const { postId, isFetching, isPostsEmpty } = usePostPage(params.address);

  if (isPostsEmpty) return <p>No Posts</p>;

  if (isFetching) return <Spinner />;

  return <>{!!postId && <PostCard key={postId} postId={postId} />}</>;
};

export default memo(Post);
