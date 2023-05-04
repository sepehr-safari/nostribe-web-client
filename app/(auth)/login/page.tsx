'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

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
    loginWithPrivateKey(event.target.value);
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
            className="btn-sm btn mt-2 md:btn"
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
            placeholder="private key"
            className="input-bordered input-primary input input-sm w-full md:input-primary md:input"
            onChange={handlePrivateKeyInput}
          />
        </div>
      </CardContainer>
    </>
  );
};

export default Login;
