import {memo, useEffect, useState} from "react";
import {Event, nip19} from "nostr-tools";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import Name from "@/components/Name";
import RelativeTime from "@/components/RelativeTime";

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
    this.queue.shift()().finally(() => {
      this.ongoingPromise = false;
      this.runQueue();
    });
  };
}

const decryptQueue = new PromiseQueue();

const DirectMessage = memo(({ hexPub, event }: { hexPub: string, event: Event }) => {
  const npub = nip19.npubEncode(hexPub);
  const [decrypted, setDecrypted] = useState<string>('');

  useEffect(() => {
    decryptQueue.addPromise(() => (window as any).nostr.nip04.decrypt(hexPub, event.content).then(setDecrypted));
  }, [hexPub, event.content]);
  return (
    <Link href={`/messages/${npub}`} key={hexPub} className="flex items-center p-2 gap-4">
      <Avatar pub={hexPub} width="w-12" />
      <div className="flex flex-col">
        <div>
          <Name pub={hexPub} />
          <span className="ml-2 text-xs leading-5 opacity-50">
            <RelativeTime date={new Date(event.created_at * 1000)} />
          </span>
        </div>
        <div className="text-xs leading-5 opacity-50">
          {decrypted}
        </div>
      </div>
    </Link>
  );
});
DirectMessage.displayName = 'DirectMessage';

export default DirectMessage;
