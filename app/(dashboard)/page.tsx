"use client";

import { memo } from 'react';
import Feed from '@/components/Feed';

import NewPostForm from '@/components/NewPostForm';
import useFeedPage from "@/hooks/pages/useFeedPage";
import useStore from "@/store";

const HomeFeed = () => {
  const { isPostsEmpty, postEvents } = useFeedPage();
  const userData = useStore((state) => state.auth.user.data);
  return (
    <>
      {userData?.publicKey ? <NewPostForm /> : null}
      <Feed events={postEvents} isEmpty={isPostsEmpty} />
    </>
  );
};

export default memo(HomeFeed);

