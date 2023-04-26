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

const getLocalStorage = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const user = window.localStorage.getItem('user');

  if (user) {
    return JSON.parse(user);
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

      set((state) => ({
        auth: { ...state.auth, user: { data: { publicKey } } },
      }));
    },
    loginWithPrivateKey: (privateKey: string) => {
      const publicKey = getPublicKey(privateKey);

      setLocalStorage({ publicKey, privateKey });

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
