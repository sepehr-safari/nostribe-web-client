'use client';

import { nip19 } from 'nostr-tools';

const usePostHex = (postAddress: string) => {
  const postId = postAddress.startsWith('note')
    ? nip19.decode(postAddress).data.toString()
    : postAddress;

  return postId;
};

export default usePostHex;
