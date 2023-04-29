import { usePostEvent, usePostHex } from '@/hooks';

const usePostPage = (postAddress: string) => {
  const postId = usePostHex(postAddress);

  const { isFetching, isPostsEmpty } = usePostEvent(postId);

  return {
    postId,
    isFetching,
    isPostsEmpty,
  };
};

export default usePostPage;
