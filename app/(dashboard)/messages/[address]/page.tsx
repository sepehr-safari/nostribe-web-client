'use client';

import {memo} from 'react';

import {nip19} from 'nostr-tools';

import {useSubscribe} from "nostr-hooks";
import useStore from "@/store";
import DirectMessage from "@/components/DirectMessage";

const MessageThread = ({ params }: { params: { address: string } }) => {
  const relays = useStore((store) => store.relays);
  const userData = useStore((state) => state.auth.user.data);
  const myPub = userData?.publicKey || '';
  const { data: hexPub } = nip19.decode(params.address);
  if (typeof hexPub !== 'string') throw new Error('Invalid address');
  const { events, eose } = useSubscribe({
    relays,
    filters: [
      { authors: [hexPub], "#p": [myPub], kinds: [4] },
      { authors: [myPub], "#p": [hexPub], kinds: [4] }
    ],
  });

  if (!eose) return <div className="p-2">Loading...</div>;

  if (!events.length) return <div className="p-2">Empty</div>;

  return (
    <div className="flex flex-col p-2">
      {events.sort((a, b) => b.created_at - a.created_at).map((event, index) => (
        <DirectMessage hexPub={hexPub} event={event} key={index} />
      ))}
    </div>
  );
};

export default memo(MessageThread);
