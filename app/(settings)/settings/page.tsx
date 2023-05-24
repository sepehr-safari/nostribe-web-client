'use client';

import Link from 'next/link';
import useStore from '@/store';
import { nip19 } from 'nostr-tools';

export default function Settings() {
  const userData = useStore((state) => state.auth.user.data);

  const pub = userData?.publicKey || '';
  const priv = userData?.privateKey || '';
  const npub = pub ? nip19.npubEncode(pub) : '';
  const nsec = priv ? nip19.nsecEncode(priv) : '';

  return (
    <div className="prose p-2">
      <h2>Account</h2>
      <p>
        <Link href="/logout" className="btn btn-primary btn-sm">
          Log out
        </Link>
      </p>
      <h3>Public key</h3>
      <p className="flex gap-2">
        <button
          className="btn btn-sm"
          onClick={() => navigator.clipboard.writeText(pub)}
        >
          Copy hex
        </button>
        <button
          className="btn btn-sm"
          onClick={() => navigator.clipboard.writeText(npub)}
        >
          Copy npub
        </button>
      </p>
      <h3>Private key</h3>
      {priv ? (
        <p className="flex gap-2">
          <button
            className="btn btn-sm"
            onClick={() => navigator.clipboard.writeText(priv)}
          >
            Copy hex
          </button>
          <button
            className="btn btn-sm"
            onClick={() => navigator.clipboard.writeText(nsec)}
          >
            Copy nsec
          </button>
        </p>
      ) : (
        <p>Not present. Good!</p>
      )}
    </div>
  );
}
