"use client";

import useStore from "@/store";

export default function Relays() {
  const relays = useStore((store) => store.relays);

  return (
    <div className="prose p-2">
      <h2>Relays</h2>
      {relays.map((relay) => (
        <div key={relay}>
          {relay}
        </div>
      ))}
    </div>
  );
}
