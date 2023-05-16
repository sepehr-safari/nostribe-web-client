"use client";

import {useProfileContacts} from "@/hooks";
import useStore from "@/store";

export default function Relays() {
  const userData = useStore((store) => store.auth.user.data);
  const {relaysOrDefaults} = useProfileContacts(userData?.publicKey || '');

  return (
    <div className="prose p-2">
      <h2>Relays</h2>
      {Object.keys(relaysOrDefaults).map((relay) => (
        <div key={relay}>
          {relay}
        </div>
      ))}
    </div>
  );
}
