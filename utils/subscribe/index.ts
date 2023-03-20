import { Event, Filter, SimplePool, verifySignature } from 'nostr-tools';

const pool = new SimplePool();

const relays = [
  'wss://relay.damus.io',
  'wss://relay.snort.social',
  'wss://eden.nostr.land',
  'wss://relay.nostr.info',
  'wss://offchain.pub',
  'wss://nostr-pub.wellorder.net',
  'wss://nostr.fmt.wiz.biz',
  'wss://nos.lol',
];

export default function subscribe(
  cb: (event: Event) => void,
  filters: Filter[]
) {
  const subscription = pool.sub(relays, filters);

  subscription.on('event', (e: Event) => {
    if (verifySignature(e)) {
      cb(e);
    }
  });

  subscription.on('eose', () => {
    if (subscription) {
      subscription.unsub();
    }
  });

  return subscription;
}
