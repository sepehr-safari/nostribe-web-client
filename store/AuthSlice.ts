import { getPublicKey } from 'nostr-tools';
import { StateCreator } from 'zustand';

export interface AuthSlice {
  auth: {
    user: {
      data: { publicKey: string; privateKey?: string } | null;
    };
    loginWithPublicKey: (publicKey: string) => void;
    loginWithPrivateKey: (privateKey: string) => void;
    logout: () => void;
  };
}

const getUserRelays = (pub: string) => {
  // TODO
};

const getLocalStorage = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  // TODO try to get iris.myKey first and convert to new format. or just use iris.myKey?

  const user = window.localStorage.getItem('user');

  if (user) {
    const obj = JSON.parse(user);
    getUserRelays(obj.publicKey);
    return obj;
  }

  return null;
};

const setLocalStorage = (user: any) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('user', JSON.stringify(user));
  }
};

const clearLocalStorage = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('user');
  }
};

const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  auth: {
    user: {
      data: getLocalStorage(),
    },
    loginWithPublicKey: (publicKey: string) => {
      setLocalStorage({ publicKey });
      getUserRelays(publicKey);

      set((state) => ({
        auth: { ...state.auth, user: { data: { publicKey } } },
      }));
    },
    loginWithPrivateKey: (privateKey: string) => {
      const publicKey = getPublicKey(privateKey);

      setLocalStorage({ publicKey, privateKey });
      getUserRelays(publicKey);

      set((state) => ({
        auth: { ...state.auth, user: { data: { publicKey, privateKey } } },
      }));
    },
    logout: () => {
      clearLocalStorage();

      set((state) => ({ auth: { ...state.auth, user: { data: null } } }));
    },
  },
});

export default createAuthSlice;
