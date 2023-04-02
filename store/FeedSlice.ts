import { Event } from 'nostr-tools';
import { StateCreator } from 'zustand';

import { verifyContent } from '@/utils';

import { PoolSlice } from './PoolSlice';

export interface FeedSlice {
  feed: {
    isLoading: boolean;
    data: null | {
      posts: Array<Event & { metadata: Event[]; reactions: Event[] }>;
    };
    error: null | string;
    fetchFeed: (options?: { authors?: string[]; ids?: string[] }) => void;
    clear: () => void;
  };
}

const createFeedSlice: StateCreator<
  FeedSlice & PoolSlice,
  [],
  [],
  FeedSlice
> = (set, get) => ({
  feed: {
    isLoading: false,
    data: null,
    error: null,
    fetchFeed: async (options) => {
      set((state) => ({
        feed: { ...state.feed, isLoading: true, data: null },
      }));

      try {
        const postsEvents = await get().pool.list([
          {
            authors: options?.authors,
            ids: options?.ids,
            kinds: [1],
            limit: 3,
          },
        ]);

        const postsDetails = await get().pool.list([
          {
            '#e': postsEvents.map((event) => event.id),
            kinds: [1, 7, 9735],
          },
          {
            authors: postsEvents.map((event) => event.pubkey),
            kinds: [0],
          },
        ]);

        const metadata = postsDetails.filter((event) => event.kind === 0);
        const reactions = postsDetails.filter(
          (event) => event.kind === 1 || event.kind === 7 || event.kind === 9735
        );

        set((state) => ({
          feed: {
            ...state.feed,
            isLoading: false,
            data: {
              posts: postsEvents
                .filter((event) => verifyContent(event))
                .map((postEvent) => ({
                  ...postEvent,
                  metadata: metadata.filter(
                    (metadataEvent) => metadataEvent.pubkey === postEvent.pubkey
                  ),
                  reactions: reactions.filter((reactionsEvent) =>
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
          feed: {
            ...state.feed,
            isLoading: false,
            data: null,
            error: error.message || 'unknown error',
          },
        }));
      }
    },
    clear: () =>
      set((state) => ({
        feed: {
          ...state.feed,
          data: null,
          error: null,
          isLoading: false,
        },
      })),
  },
});

export default createFeedSlice;
