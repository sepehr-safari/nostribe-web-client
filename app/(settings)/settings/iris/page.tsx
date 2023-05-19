"use client";

import useStore from "@/store";
import IrisTo from "@/iris/IrisTo";
import {useEffect, useState} from "react";
import { useRouter } from 'next/navigation';

function CreateAccount({ pub }: { pub: string }) {
  const [newUserName, setNewUserName] = useState<string>('');
  const [newUserNameError, setNewUserNameError] = useState<string | null>(null);
  const [newUserNameAvailable, setNewUserNameAvailable] = useState<boolean>(false);

  const onNewUserNameChange = (e: any) => {
    const name = e.target.value;
    setNewUserName(name);
    if (name.length < 6) {
      setNewUserNameError('Username must be at least 6 characters long');
      return;
    }
    if (name.length > 15) {
      setNewUserNameError('Username must be less than 15 characters long');
      return;
    }
    if (!name.match(/^[a-z0-9]+$/)) {
      setNewUserNameError('Username must be alphanumeric');
      return;
    }
    setNewUserNameError(null);
    IrisTo.checkAvailability(name).then((res) => {
      if (res.available) {
        setNewUserNameError(null);
        setNewUserNameAvailable(true);
      } else {
        setNewUserNameError(res.message || `Username ${name} is not available`);
        setNewUserNameAvailable(false);
      }
    });
  }

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (newUserNameError) {
      return;
    }
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
        <button className="btn btn-primary" type="submit" disabled={!newUserNameAvailable}>
          Register
        </button>
        <p>
          {newUserNameError && <span className="negative">{newUserNameError}</span>}
          {newUserNameAvailable && <span className="positive">Username is available!</span>}
        </p>
      </form>
    </div>
  )
}

function AccountName({ name, link = true }: { name: string, link?: boolean }) {
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
              router.replace(`/${name}`)
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
    pub && IrisTo.checkExistingAccount(pub).then((res) => {
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
      <p>
        {userName ? <AccountName name={userName} /> : <CreateAccount pub={pub} />}
      </p>
    </div>
  );
}
