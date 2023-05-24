"use client";
"use strict";
import React, { useEffect, useState } from "react";
import { Relay } from 'nostr-tools';
import { useProfileContacts } from "@/hooks";
import useStore from "@/store";

export default function Relays() {
  const [relays, setRelays] = useState(new Map<string, Relay>());
  const userData = useStore((store) => store.auth.user.data);
  const simplePool = useStore((store) => store.pool.simplePool);
  const { relaysOrDefaults } = useProfileContacts(userData?.publicKey || '');

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const tempRelays = new Map<string, Relay>();
      if (relaysOrDefaults) {
        for (const url of Object.keys(relaysOrDefaults)) {
          if (!tempRelays.has(url)) {
            const relay = await simplePool.ensureRelay(url);
            tempRelays.set(url, relay);
          }
        }
      }
      setRelays(tempRelays);
    }, 2000); // running every 2 seconds

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [relaysOrDefaults, simplePool]);

  return (
    <div className="prose p-2">
      <h2>Relays</h2>
      {Array.from(relays.entries()).map(([url, relay]) => {
        return (
          <div key={url}>
            <span className={`mr-2 inline-block h-3 w-3 rounded-full ${relay?.status === 1 ? 'bg-iris-green' : 'bg-iris-red'}`} />
            {url}
          </div>
        );
      })}
    </div>
  );
}
