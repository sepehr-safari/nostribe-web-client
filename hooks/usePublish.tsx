import { Event, getEventHash, signEvent, UnsignedEvent } from 'nostr-tools';

import useStore from '@/store';

interface Options {
  kind: number;
  tags?: string[][];
  content?: Record<string, string>;
}
const usePublish = () => {
  const userData = useStore((state) => state.auth.user.data);
  const publish = useStore((state) => state.pool.publish);

  return ({ content, kind, tags }: Options) => {
    return new Promise<Event>(async (resolve, reject) => {
      const pubkey = userData
        ? userData.publicKey
        : (await (window as any).nostr.getPublicKey()) || '';
      const pk = userData ? userData.privateKey : '';

      if (!pubkey) {
        reject(new Error('No public key provided'));
      }

      const unsignedEvent: UnsignedEvent = {
        pubkey,
        created_at: Math.floor(Date.now() / 1000),
        content: JSON.stringify(content) || '',
        tags: tags || [],
        kind,
      };

      const signedEvent: Event = pk
        ? {
            ...unsignedEvent,
            id: getEventHash(unsignedEvent),
            sig: signEvent(unsignedEvent, pk),
          }
        : (await (window as any).nostr.signEvent(unsignedEvent)) || {};

      if (!signedEvent.sig) {
        reject(new Error('No signature provided'));
      }

      const pub = publish(signedEvent);

      pub.on('ok', () => {
        resolve(signedEvent);
      });
    });
  };
};

export default usePublish;
