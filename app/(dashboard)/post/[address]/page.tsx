import PostPage from '@/components/PostPage';

const Post = ({ params }: { params: { address: string } }) => {
  return (
    <>
      <PostPage address={params.address} />
    </>
  );
};

export default Post;
