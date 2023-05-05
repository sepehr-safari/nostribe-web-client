'use client';

import { memo } from 'react';

import Link from 'next/link';

import { nip19 } from 'nostr-tools';

import Avatar from "@/components/Avatar";
import Name from "@/components/Name";
import RelativeTime from "@/components/RelativeTime";
import {useSubscribe} from "nostr-hooks";
import useStore from "@/store";

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

  if (!eose) return <p>Loading...</p>;

  if (!events.length) return <p>Empty</p>;

  return (
    <div className="flex flex-col gap-4 p-2">
      {events.sort((a, b) => b.created_at - a.created_at).map((event, index) => (
        <div key={event.id} className="flex flex-row gap-2">
          <div className="flex items-center gap-2">
            <Link
              prefetch={false}
              href={`/profile/${nip19.npubEncode(event.pubkey)}`}
              className="flex items-center gap-2"
            >
              <Avatar pub={event.pubkey} />

              <div className="flex flex-col">
                <Name pub={event.pubkey} />

                <div className="text-xs leading-5 opacity-50">
                  <RelativeTime date={new Date(event.created_at * 1000)} />
                </div>
              </div>
            </Link>
          </div>
          <div className="flex flex-1 justify-end text-gray-500">
            encrypted message
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(MessageThread);
