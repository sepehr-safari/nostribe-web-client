'use client';

import { useRouter } from 'next/navigation';
import { generatePrivateKey } from 'nostr-tools';
import { useCallback, useEffect, useState } from 'react';

import { CardContainer, Spinner } from '@/components';

import useStore from '@/store';

import { usePublish } from '@/hooks';

const Login = () => {
  const router = useRouter();

  const { data } = useStore((state) => state.auth.user);
  const { loginWithPublicKey, loginWithPrivateKey } = useStore(
    (state) => state.auth
  );
  const publish = usePublish();

  const [privateKey, setPrivateKey] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      router.replace('/');
    }
  }, [data, router]);

  const handlePrivateKeyInput = useCallback((event: any) => {
    setPrivateKey(event.target.value);
  }, []);

  const handleDisplayNameInput = useCallback((event: any) => {
    setDisplayName(event.target.value);
  }, []);

  const handleGenerateButton = useCallback(() => {
    const privateKey = generatePrivateKey();

    setIsNewUser(true);
    setPrivateKey(privateKey);
  }, []);

  const handleLoginWithPrivateKey = useCallback(async () => {
    if (!privateKey) return;

    setIsLoading(true);

    if (isNewUser) {
      const event = await publish({ kind: 0 });

      if (!event) return;
    }

    loginWithPrivateKey(privateKey);
  }, [loginWithPrivateKey, privateKey, isNewUser, publish]);

  const handleLoginWithExtension = useCallback(async () => {
    setIsLoading(true);

    if (!(window as any).nostr) return;

    const pubkey = await (window as any).nostr.getPublicKey();

    if (pubkey) {
      loginWithPublicKey(pubkey);
    }
  }, []);

  return (
    <>
      <CardContainer>
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-bold md:text-4xl">Nostribe</h1>
          <h2 className="text-xs">Join the tribe, join the vibe.</h2>
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
            type="text"
            placeholder="private key"
            className="input-bordered input-primary input input-sm w-full md:input-primary md:input"
            value={privateKey}
            onChange={handlePrivateKeyInput}
          />
          {isNewUser && (
            <>
              <label className="label mt-4">
                <span className="label-text">
                  What do you want to be called on Nostr?
                </span>
              </label>
              <input
                type="text"
                placeholder="display name"
                className="input-bordered input-primary input input-sm w-full md:input-primary md:input"
                value={displayName}
                onChange={handleDisplayNameInput}
              />

              <p className="mt-6 mb-2 text-warning">
                <strong>Warning:</strong>
                {`Do not share your private key with anyone.
                It is important that you keep it safe.
                It is the only way to access your account.
                If you lose it, you will lose access to your account.`}
              </p>
            </>
          )}
        </div>

        {isLoading ? (
          <Spinner />
        ) : (
          <button
            className="btn-primary btn-sm btn mt-2"
            onClick={handleLoginWithPrivateKey}
          >
            Login
          </button>
        )}
      </CardContainer>

      {!isNewUser && (
        <CardContainer>
          <p className="mb-2 text-center">Don't you have a private key?</p>

          <button
            className="btn-primary btn-sm btn"
            onClick={handleGenerateButton}
          >
            Generate new private key
          </button>
        </CardContainer>
      )}
    </>
  );
};

export default Login;
