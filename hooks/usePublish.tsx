import { Event, getEventHash, signEvent, UnsignedEvent } from 'nostr-tools';

import useSign from './useSign';
import useStore from '@/store';

interface Options {
  kind: number;
  tags?: string[][];
  content?: string | Record<string, string>;
}
const usePublish = () => {
  const publish = useStore((state) => state.pool.publish);
  const sign = useSign();

  return ({ content, kind, tags }: Options) => {
    return new Promise<Event>(async (resolve, reject) => {
      try {
        const signedEvent = await sign({ content, kind, tags });
        const pub = publish(signedEvent);

        pub.on('ok', () => {
          resolve(signedEvent);
        });
      } catch (e) {
        reject(e);
      }
    });
  };
};

export default usePublish;
