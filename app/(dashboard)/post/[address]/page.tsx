'use client';

import PostPage from '@/components/PostPage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'edge';

const Post = ({ params }: { params: { address: string } }) => {
  return (
    <>
      <PostPage address={params.address} />
    </>
  );
};

export default Post;
