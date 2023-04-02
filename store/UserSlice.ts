import { StateCreator } from 'zustand';

export interface UserSlice {
  user: { publicKey: string; privateKey: string } | null;
  setUser: () => void;
}

const createUserSlice: StateCreator<UserSlice> = (set, get) => ({
  user: null,
  setUser: () => set({ user: null }),
});

export default createUserSlice;
