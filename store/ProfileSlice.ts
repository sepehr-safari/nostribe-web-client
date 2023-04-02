import { Event } from 'nostr-tools';
import { StateCreator } from 'zustand';

import { getProfileHex } from '@/utils';

import { PoolSlice } from './PoolSlice';

export interface ProfileSlice {
  profile: {
    isLoading: boolean;
    data: null | {
      metadata: Array<Event>;
      contacts: Array<Event>;
      posts: Array<Event & { reactions: Event[] }>;
    };
    error: null | string;
    fetchProfile: (profileAddress: string) => void;
    clear: () => void;
  };
}

const createProfileSlice: StateCreator<
  ProfileSlice & PoolSlice,
  [],
  [],
  ProfileSlice
> = (set, get) => ({
  profile: {
    isLoading: false,
    data: null,
    error: null,
    fetchProfile: async (profileAddress: string) => {
      set((state) => ({
        profile: { ...state.profile, isLoading: true, data: null },
      }));

      try {
        const profileHex = await getProfileHex(profileAddress);

        const profileEvents = await get().pool.list([
          { authors: [profileHex], kinds: [0, 3] },
          { authors: [profileHex], kinds: [1], limit: 5 },
        ]);

        if (!profileEvents) {
          set((state) => ({
            profile: {
              ...state.profile,
              isLoading: false,
              data: null,
              error: 'no events',
            },
          }));
        }

        const metadata = profileEvents.filter((event) => event.kind === 0);
        const posts = profileEvents
          .filter((event) => event.kind === 1)
          .map((post) => ({ ...post, reactions: [] }));
        const contacts = profileEvents.filter((event) => event.kind === 3);

        set((state) => ({
          profile: {
            ...state.profile,
            isLoading: false,
            data: { metadata, contacts, posts },
            error: null,
          },
        }));

        const postsReactionsEvents = await get().pool.list([
          {
            '#e': posts.map((event) => event.id),
            kinds: [1, 7, 9735],
          },
        ]);

        set((state) => ({
          profile: {
            ...state.profile,
            data: {
              metadata,
              contacts,
              posts: posts.map((postEvent) => ({
                ...postEvent,
                reactions: postsReactionsEvents.filter((reactionsEvent) =>
                  reactionsEvent.tags.find(
                    (tag) => tag[0] === 'e' && tag[1] === postEvent.id
                  )
                ),
              })),
            },
            error: null,
          },
        }));
      } catch (error: any) {
        set((state) => ({
          profile: {
            ...state.profile,
            isLoading: false,
            data: null,
            error: error.message || 'unknown error',
          },
        }));
      }
    },
    clear: () =>
      set((state) => ({
        profile: {
          ...state.profile,
          data: null,
          error: null,
          isLoading: false,
        },
      })),
  },
});

export default createProfileSlice;
