import { useGlobalPosts } from '@/hooks';

const useFeedPage = () => {
  const { isFetching, isPostsEmpty, postEvents } = useGlobalPosts();

  return {
    isFetching,
    isPostsEmpty,
    postEvents,
  };
};

export default useFeedPage;
