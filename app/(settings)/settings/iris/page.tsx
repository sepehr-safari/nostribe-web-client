'use client';

import useStore from '@/store';
import IrisTo from '@/iris/IrisTo';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useSign from '@/hooks/useSign';

function CreateAccount({ onSuccess }: { onSuccess: (name: string) => void }) {
  const [newUserName, setNewUserName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [newUserNameAvailable, setNewUserNameAvailable] =
    useState<boolean>(false);
  const [showChallenge, setShowChallenge] = useState<boolean>(false);
  const sign = useSign();

  const onNewUserNameChange = (e: any) => {
    const name = e.target.value;
    setNewUserName(name);
    if (name.length < 6) {
      setError('Username must be at least 6 characters long');
      return;
    }
    if (name.length > 15) {
      setError('Username must be less than 15 characters long');
      return;
    }
    if (!name.match(/^[a-z0-9]+$/)) {
      setError('Username must be alphanumeric');
      return;
    }
    setError(null);
    IrisTo.checkAvailability(name).then((res) => {
      if (res.available) {
        setError(null);
        setNewUserNameAvailable(true);
      } else {
        setError(res.message || `Username ${name} is not available`);
        setNewUserNameAvailable(false);
      }
    });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!newUserNameAvailable) {
      return;
    }
    setShowChallenge(true);
  };

  const register = async (cfToken: string) => {
    console.log('register', cfToken);
    const event = await sign({
      content: `iris.to/${newUserName}`,
      kind: 1,
    });
    // post signed event as request body to https://api.iris.to/user/confirm_user
    const res = await fetch('https://api.iris.to/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event, cfToken }),
    });
    if (res.status === 200) {
      setError(null);
      onSuccess(newUserName);
    } else {
      res
        .json()
        .then((json) => {
          setError(json.message || 'error');
        })
        .catch(() => {
          setError('error');
        });
    }
    delete (window as any).cf_turnstile_callback;
    setShowChallenge(false);
  };

  if (showChallenge) {
    (window as any).cf_turnstile_callback = (token: string) => register(token);
    return (
      <>
        <script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        ></script>
        <div
          className="cf-turnstile"
          data-sitekey={
            ['new.iris.to', 'iris.to', 'beta.iris.to'].includes(
              window.location.hostname
            )
              ? '0x4AAAAAAACsEd8XuwpPTFwz'
              : '3x00000000000000000000FF'
          }
          data-callback="cf_turnstile_callback"
        ></div>
      </>
    );
  }

  return (
    <div>
      <p>Register an Iris username (iris.to/username)</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          placeholder="Username"
          value={newUserName}
          className="input"
          onInput={(e) => onNewUserNameChange(e)}
        />
        <button
          className="btn btn-primary"
          type="submit"
          disabled={!newUserNameAvailable}
        >
          Register
        </button>
        {error && <p className="text-warning">{error}</p>}
        {newUserNameAvailable && (
          <>
            <p className="text-success">Username is available!</p>
            <AccountName name={newUserName} link={false} />
          </>
        )}
      </form>
    </div>
  );
}

function AccountName({ name, link = true }: { name: string; link?: boolean }) {
  const router = useRouter();
  return (
    <>
      <p>
        Username: <b>{name}</b>
      </p>
      <p>
        Short link:{' '}
        {link ? (
          <a
            href={`https://iris.to/${name}`}
            onClick={(e) => {
              e.preventDefault();
              router.replace(`/${name}`);
            }}
          >
            iris.to/{name}
          </a>
        ) : (
          <>iris.to/{name}</>
        )}
      </p>
      <p>
        Nostr address (nip05): <b>{name}@iris.to</b>
      </p>
    </>
  );
}

export default function IrisToSettings() {
  const [userName, setUserName] = useState<string | null>(null);
  const userData = useStore((state) => state.auth.user.data);
  const pub = userData?.publicKey;

  useEffect(() => {
    pub &&
      IrisTo.checkExistingAccount(pub).then((res) => {
        const username = res?.name;
        setUserName(username);
      });
  }, [pub]);

  if (!pub) {
    return null;
  }

  return (
    <div className="prose p-2">
      <h2>Iris.to</h2>
      <div>
        {userName ? (
          <AccountName name={userName} />
        ) : (
          <CreateAccount onSuccess={(n) => setUserName(n)} />
        )}
      </div>
    </div>
  );
}
