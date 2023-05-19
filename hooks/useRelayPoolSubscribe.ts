import { useState, useEffect } from 'react';
import { Event, Filter } from 'nostr-tools';
import { RelayPool, SubscriptionOptions } from 'nostr-relaypool';

let globalRelayPool: RelayPool | null = null;

const useRelayPoolSubscribe = (ops: {
  relays: string[];
  filters: Filter[];
  options: SubscriptionOptions;
  maxDelayms: number;
  onEose: () => {};
  relayPool?: RelayPool;
}) => {
  const { relays, filters, options, maxDelayms, onEose } = ops;
  const [events, setEvents] = useState<Event[]>([]);
  const [eose, setEose] = useState(false);
  let initalRelayPool = ops.relayPool;
  if (!initalRelayPool) {
    if (!globalRelayPool) {
      globalRelayPool = new RelayPool(undefined, { logErrorsAndNotices: true });
    }
    initalRelayPool = globalRelayPool;
  }

  const [relayPool, setRelayPool] = useState<RelayPool>(initalRelayPool);
  const [unsubscribe, setUnsubscribe] = useState<() => void>(() => () => {});

  useEffect(() => {
    setUnsubscribe(() => {
      relayPool.subscribe(
        filters,
        relays,
        (event: any, isAfterEose: boolean, relayURL: string | undefined) => {
          setEvents((prevEvents: Event[]) => [...prevEvents, event]);
        },
        maxDelayms,
        onEose,
        options
      );
      setUnsubscribe(() => () => {});
    });
  }, []);

  const invalidate = () => {
    setEvents([]);
    setEose(false);
    unsubscribe();
  };

  return { events, eose, invalidate };
};

export default useRelayPoolSubscribe;
