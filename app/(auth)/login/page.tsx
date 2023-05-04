'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCallback, useEffect } from 'react';
import { nip19 } from 'nostr-tools';

import { CardContainer } from '@/components';

import useStore from '@/store';

const Login = () => {
  const router = useRouter();

  const { data } = useStore((state) => state.auth.user);
  const { loginWithPublicKey, loginWithPrivateKey } = useStore(
    (state) => state.auth
  );

  useEffect(() => {
    if (data) {
      router.replace('/');
    }
  }, [data, router]);

  const handlePrivateKeyInput = useCallback((event: any) => {
    const key = event.target.value;

    const { data, type } = nip19.decode(key);

    if (type === 'npub') {
      loginWithPublicKey(data);
      return;
    } else if (type === 'nsec') {
      loginWithPrivateKey(data);
      return;
    } else {
      loginWithPrivateKey(key);
    }
  }, []);

  const handleLoginWithExtension = useCallback(async () => {
    if (!(window as any).nostr) return;

    const pubkey = await (window as any).nostr.getPublicKey();

    if (pubkey) {
      loginWithPublicKey(pubkey);
    }
  }, [loginWithPublicKey]);

  return (
    <>
      <CardContainer>
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-bold md:text-4xl">iris</h1>
          <h2 className="text-xs">Connecting People</h2>
        </div>
      </CardContainer>

      <CardContainer>
        <div className="form-control w-full">
          <button
            className="btn btn-primary mt-2 rounded-full capitalize"
            onClick={handleLoginWithExtension}
          >
            Login with extension
          </button>

          <p className="my-4 text-center">{`- or -`}</p>

          <label className="label">
            <span className="label-text">Login with your private key:</span>
          </label>
          <input
            type="password"
            placeholder="Private key"
            className="input-bordered rounded-full input-primary input w-full md:input-primary"
            onChange={handlePrivateKeyInput}
          />
        </div>
      </CardContainer>
      <CardContainer>
        <p className="text-sm">
          Don't have an account?
        </p>
        <p>
          <Link href="/signup" className="btn btn-sm rounded-full capitalize">Sign up</Link>
        </p>
      </CardContainer>
    </>
  );
};

export default Login;
