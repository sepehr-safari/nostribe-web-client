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
  const { loginWithPrivateKey } = useStore(
    (state) => state.auth
  );
  const publish = usePublish();

  const [displayName, setDisplayName] = useState<string>('');

  useEffect(() => {
    if (data) {
      router.replace('/');
    }
  }, [data, router]);

  const handleDisplayNameInput = useCallback((event: any) => {
    setDisplayName(event.target.value);
  }, []);

  const handleSignupButton = useCallback(() => {
    loginWithPrivateKey(generatePrivateKey());
  }, []);

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
        </div>
        <button
          className="btn-primary btn-sm btn"
          onClick={handleSignupButton}
        >
          Go
        </button>
      </CardContainer>
    </>
  );
};

export default Login;
