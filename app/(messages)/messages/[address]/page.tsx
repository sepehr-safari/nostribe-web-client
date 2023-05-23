'use client';

import {nip19, nip04} from 'nostr-tools';

import {useSubscribe, usePublish} from "nostr-hooks";
import useStore from "@/store";
import DirectMessage from "@/components/DirectMessage";
import {
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import {FormEventHandler, useState} from "react";

export const runtime = 'edge';

const MessageThread = ({ params }: { params: { address: string } }) => {
  const [newMessage, setNewMessage] = useState('');
  const relays = useStore((store) => store.relays);
  const userData = useStore((state) => state.auth.user.data);
  const myPub = userData?.publicKey || '';
  const { data: hexPub } = nip19.decode(params.address);
  if (typeof hexPub !== 'string') throw new Error('Invalid address');
  const { events } = useSubscribe({
    relays,
    filters: [
      { authors: [myPub], "#p": [hexPub], kinds: [4] },
      { authors: [hexPub], "#p": [myPub], kinds: [4] },
    ],
    options: {
      force: true,
      closeAfterEose: false,
      invalidate: true,
      enabled: !!myPub,
    }
  });

  const encrypt = async (message: string) => {
    let encrypted;
    if (userData?.privateKey) {
      encrypted = await nip04.encrypt(userData.privateKey, hexPub, message);
    } else {
      encrypted = await (window as any).nostr.nip04.encrypt(hexPub, message);
    }
    return encrypted;
  };

  const publish = usePublish(relays);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const content = await encrypt(newMessage);
    await publish({
      kind: 4,
      tags: [['p', hexPub]],
      content,
    });
    setNewMessage('');
  }

  if (!events.length) return <div className="p-2 text-neutral-500">Nothing here yet</div>;

return (
  <div className="flex flex-col space-y-2 h-full max-h-full justify-end pb-16">
    <div>
      {events.sort((a, b) => a.created_at - b.created_at).map((event, index) => (
        <DirectMessage showEventAuthor={true} hexPub={hexPub} event={event} key={index} />
      ))}
      <div className="p-2 italic">
        Nostr direct messages are encrypted, but anyone can see who you're messaging with and when.
      </div>
    </div>
    <form className="w-full p-2 items-center md:w-1/3 flex fixed bottom-0 bg-black" onSubmit={onSubmit}>
      <input
        type="text"
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
        placeholder="Type a message..."
        className="flex-grow px-4 py-2 mr-4 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-neutral-900"
      />
      <button
        type="submit"
        className="btn btn-primary btn-circle btn-sm"
      >
        <PaperAirplaneIcon width={20} />
      </button>
    </form>
  </div>
);


};

export default MessageThread;
