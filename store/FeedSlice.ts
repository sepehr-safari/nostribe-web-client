import { Event, Filter, Sub } from 'nostr-tools';
import { StateCreator } from 'zustand';

import { verifyContent } from '@/utils';

import { AuthorData, PostData } from '@/types';

import { PoolSlice } from './PoolSlice';

export interface FeedData {
  posts?: PostData[];
  author?: AuthorData;
}

type FetchFeed = (options?: { author?: string; id?: string }) => void;

type ClearFeed = () => void;

export interface FeedSlice {
  feed: {
    data: FeedData | null;
    error: null | string;
    isFetching: boolean;
    fetchFeed: FetchFeed;
    clearFeed: ClearFeed;
  };
}

const createFeedSlice: StateCreator<
  FeedSlice & PoolSlice,
  [],
  [],
  FeedSlice
> = (set, get) => {
  const clearFeed: ClearFeed = () => {
    set((state) => ({
      feed: {
        ...state.feed,
        data: null,
        error: null,
      },
    }));
  };

  const fetchFeed: FetchFeed = (options) => {
    // declaring handlers
    const handleIsFetching = (isFetching: boolean) => {
      set((state) => ({
        feed: { ...state.feed, isFetching },
      }));
    };

    const handleAuthorEvent = (e: Event) => {
      set((state) => ({
        feed: {
          ...state.feed,
          data: {
            ...state.feed.data,
            author: {
              ...state.feed.data?.author,
              event: e,
            },
          },
        },
      }));
    };

    const handleAuthorContact = (e: Event) => {
      set((state) => ({
        feed: {
          ...state.feed,
          data: {
            ...state.feed.data,
            author: {
              ...state.feed.data?.author,
              contacts: [...(state.feed.data?.author?.contacts || []), e],
            },
          },
        },
      }));
    };

    const handleNewPost = (e: Event) => {
      const isVerifiedContent = verifyContent(e);

      if (!isVerifiedContent) return;

      set((state) => ({
        feed: {
          ...state.feed,
          data: {
            ...state.feed.data,
            posts: [
              ...(state.feed.data?.posts || []),
              { event: e, metadata: state.feed.data?.author?.event },
            ],
          },
        },
      }));
    };

    const mutatePosts = (newPostList: PostData[]) => {
      set((state) => ({
        feed: {
          ...state.feed,
          data: {
            ...state.feed.data,
            posts: newPostList,
          },
        },
      }));
    };

    const handleSubscription = (
      filters: Filter[],
      eventHandler: (e: Event) => void
    ) => {
      return new Promise<void>((resolve) => {
        const eoseHandler = (subscription: Sub) => {
          subscription.unsub();

          resolve();
        };

        const subscription = get().pool.sub(filters);
        subscription.on('event', eventHandler);
        subscription.on('eose', () => eoseHandler(subscription));
      });
    };

    const handleMainFilters = (): Filter[] => {
      return !options
        ? [{ kinds: [1], limit: 6 }]
        : options.author
        ? [
            { authors: [options.author], kinds: [0, 3] },
            { authors: [options.author], kinds: [1], limit: 6 },
          ]
        : options.id
        ? [{ ids: [options.id], kinds: [1], limit: 6 }]
        : [];
    };

    const handleMainEvent = (e: Event) => {
      if (e.kind === 0) {
        handleAuthorEvent(e);
      } else if (e.kind === 3) {
        handleAuthorContact(e);
      } else {
        handleNewPost(e);
      }
    };

    const handleDuplicatePostIds = () => {
      const uniquePostIds = [
        ...new Set((get().feed.data?.posts || []).map((post) => post.event.id)),
      ];

      return uniquePostIds;
    };

    const handleDuplicatePostAuthors = () => {
      const uniquePostAuthors = [
        ...new Set(
          (get().feed.data?.posts || []).map((post) => post.event.pubkey)
        ),
      ];

      return uniquePostAuthors;
    };

    const handleDuplicatePostMentions = () => {
      const uniquePostMentions = [
        ...new Set(
          (get().feed.data?.posts || []).reduce<string[]>((acc, post) => {
            post.event.tags.forEach(
              (tag) => tag[0] === 'p' && acc.push(tag[1])
            );

            return acc;
          }, [])
        ),
      ];

      return uniquePostMentions;
    };

    const handleExtraFilters = (): Filter[] => {
      const uniquePostIds = handleDuplicatePostIds();
      const uniquePostAuthors = handleDuplicatePostAuthors();
      const uniquePostMentions = handleDuplicatePostMentions();

      return [
        {
          '#e': uniquePostIds,
          kinds: [1, 7, 9735],
        },
        {
          authors: uniquePostAuthors,
          kinds: [0],
        },
        {
          authors: uniquePostMentions,
          kinds: [0],
        },
      ];
    };

    const handleExtraEvent = (e: Event) => {
      const eventType =
        e.kind === 1 || e.kind === 7 || e.kind === 9735
          ? 'reaction'
          : 'metadata';

      const currentPostList = get().feed.data?.posts || [];
      const newPostList = currentPostList.map<PostData>((post) => {
        if (eventType === 'reaction') {
          const hasTag = e.tags.find(
            (tag) => tag[0] === 'e' && tag[1] === post.event.id
          );

          if (hasTag) {
            return {
              ...post,
              reactions: [...(post.reactions || []), e],
            };
          }
        } else if (eventType === 'metadata') {
          const metadataOwner =
            e.pubkey === post.event.pubkey ? 'author' : 'mentions';

          if (metadataOwner === 'author') {
            const hasMetadata = post.metadata;

            if (hasMetadata) return post;

            return { ...post, metadata: e };
          } else if (metadataOwner === 'mentions') {
            const hasTag = post.event.tags.find(
              (tag) => tag[0] === 'p' && tag[1] === e.pubkey
            );

            if (hasTag) {
              return { ...post, mentions: [...(post.mentions || []), e] };
            }
          }
        }

        return post;
      });

      mutatePosts(newPostList);
    };

    const handleError = (error: any) => {
      set((state) => ({ ...state, feed: { ...state.feed, error } }));
    };

    // executaions
    handleIsFetching(true);
    clearFeed();
    handleSubscription(handleMainFilters(), handleMainEvent)
      .then(() => handleSubscription(handleExtraFilters(), handleExtraEvent))
      .finally(() => handleIsFetching(false));
  };

  const feedSlice: FeedSlice = {
    feed: {
      data: null,
      error: null,
      isFetching: true,
      fetchFeed,
      clearFeed,
    },
  };

  return feedSlice;
};

export default createFeedSlice;
