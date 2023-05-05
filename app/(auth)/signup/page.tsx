'use client';

import { useRouter } from 'next/navigation';
import { generatePrivateKey } from 'nostr-tools';
import { useCallback, useEffect, useState } from 'react';

import { CardContainer, Spinner } from '@/components';

import useStore from '@/store';

import { usePublish } from '@/hooks';
import Link from "next/link";

const Login = () => {
  const router = useRouter();

  const { data } = useStore((state) => state.auth.user);
  const { loginWithPrivateKey } = useStore(
    (state) => state.auth
  );
  const publish = usePublish();

  const [name, setName] = useState<string>('');

  useEffect(() => {
    if (data) {
      if (name) {
        publish({
          kind: 0,
          content: { name }
        }).catch(console.error);
      }
      router.replace('/');
    }
  }, [data, router]);

  const handleDisplayNameInput = useCallback((event: any) => {
    setName(event.target.value);
  }, []);

  const handleSignupButton = useCallback(() => {
    const privateKey = generatePrivateKey();
    loginWithPrivateKey(privateKey);
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
          <input
            autoFocus={true}
            type="text"
            placeholder="What's your name?"
            className="input-bordered input-primary input w-full"
            value={name}
            onChange={handleDisplayNameInput}
          />
        </div>
        <button
          className="btn-primary btn"
          onClick={handleSignupButton}
        >
          Go
        </button>
      </CardContainer>

      <CardContainer>
        <p className="text-sm">Already have an account?</p>
        <p>
          <Link href="/login" className="btn btn-sm">Log in</Link>
        </p>
      </CardContainer>
    </>
  );
};

export default Login;
