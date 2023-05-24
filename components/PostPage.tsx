'use client';

import { memo } from 'react';

import { usePostHex } from '@/hooks';

import PostCard from '@/components/Post/PostCard';
import Spinner from '@/components/Spinner';
import useStore from '@/store';
import { useSubscribe } from 'nostr-hooks';

const PostPage = ({ address }: { address: string }) => {
  const postId = usePostHex(address);
  const userData = useStore((state) => state.auth.user.data);
  const relays = useStore((store) => store.relays);

  const { events: postEvents, eose: postEose } = useSubscribe({
    relays,
    filters: [{ ids: [postId] }],
  });

  const isFetching = !postEose && !postEvents.length;
  const isPostsEmpty = postEose && !postEvents.length;

  if (isPostsEmpty) return <p>No Posts</p>;

  if (isFetching) return <Spinner />;

  return (
    <>
      {!!postId && (
        <PostCard
          key={postId}
          postId={postId}
          showReplies={Infinity}
          standalone={true}
          showReplyForm={!!userData?.publicKey}
        />
      )}
    </>
  );
};

export default memo(PostPage);
