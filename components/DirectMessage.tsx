import { memo, useEffect, useState } from 'react';
import { Event, nip19, nip04 } from 'nostr-tools';
import Link from 'next/link';
import Avatar from '@/components/Avatar';
import Name from '@/components/Name';
import RelativeTime from '@/components/RelativeTime';
import useStore from '@/store';

class PromiseQueue {
  queue: any[] = [];
  ongoingPromise = false;

  addPromise = (fn: any) => {
    this.queue.push(fn);
    this.runQueue();
  };

  runQueue = (): void => {
    if (this.ongoingPromise) return;
    if (this.queue.length === 0) return;
    this.ongoingPromise = true;
    this.queue
      .shift()()
      .finally(() => {
        this.ongoingPromise = false;
        this.runQueue();
      });
  };
}

const decryptQueue = new PromiseQueue();

const DirectMessage = memo(
  ({
    hexPub,
    event,
    showEventAuthor,
    limitText,
  }: {
    hexPub: string;
    event: Event;
    showEventAuthor?: boolean;
    limitText?: number;
  }) => {
    const npub = nip19.npubEncode(hexPub);
    const userData = useStore((state) => state.auth.user.data);
    const [decrypted, setDecrypted] = useState<string>('');
    const pub = showEventAuthor ? event.pubkey : hexPub;

    useEffect(() => {
      decryptQueue.addPromise(() => {
        if (userData?.privateKey) {
          return nip04
            .decrypt(userData.privateKey, hexPub, event.content)
            .then(setDecrypted);
        } else {
          return (window as any).nostr.nip04
            .decrypt(hexPub, event.content)
            .then(setDecrypted);
        }
      });
    }, [hexPub, event.content]);
    const text =
      limitText && decrypted.length > limitText
        ? decrypted.slice(0, limitText) + '...'
        : decrypted;
    return (
      <Link
        prefetch={false}
        href={`/messages/${npub}`}
        key={event.id}
        className="flex items-center p-2 gap-4"
      >
        <Avatar pub={pub} width="w-12" />
        <div className="flex flex-col">
          <div>
            <Name pub={pub} />
            <span className="ml-2 text-xs leading-5 opacity-50">
              <RelativeTime date={new Date(event.created_at * 1000)} />
            </span>
          </div>
          <div className="text-xs leading-5 opacity-50">{text}</div>
        </div>
      </Link>
    );
  }
);
DirectMessage.displayName = 'DirectMessage';

export default DirectMessage;
