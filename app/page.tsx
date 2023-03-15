'use client';

import { useEffect, useState } from 'react';

import { SimplePool } from 'nostr-tools';

import { PostCard } from '@/components';

import { IPost } from '@/types';

// [TODO] Do you love Spaghetti or what?

export default function Feed() {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const pool = new SimplePool();

    const relays = [
      'wss://relay.damus.io',
      'wss://relay.snort.social',
      'wss://eden.nostr.land',
      'wss://relay.nostr.info',
      'wss://offchain.pub',
      'wss://nostr-pub.wellorder.net',
      'wss://nostr.fmt.wiz.biz',
      'wss://nos.lol',
    ];

    const fetchPosts = () => {
      const subscribeGlobalPosts = pool.sub(relays, [
        {
          kinds: [1],
          limit: 20,
        },
      ]);

      subscribeGlobalPosts.on('event', (globalPostsEvent: any) => {
        const postObj: IPost = {
          id: globalPostsEvent.id,
          content: globalPostsEvent.content,
          author: {
            pubkey: globalPostsEvent.pubkey,
          },
        };

        const subscribeGlobalAuthors = pool.sub(relays, [
          { authors: [postObj.author.pubkey], kinds: [0] },
        ]);

        subscribeGlobalAuthors.on('event', (globalAuthorsEvent: any) => {
          const authorDetail = JSON.parse(globalAuthorsEvent.content);

          postObj.author = {
            ...postObj.author,
            name: authorDetail.name,
            nip05: authorDetail.nip05,
            profilePicture: authorDetail.picture,
          };

          setPosts((oldPosts: IPost[]) => [...oldPosts, postObj]);
        });

        subscribeGlobalAuthors.on('eose', () => {
          subscribeGlobalAuthors.unsub();
        });

        const subscribePostReactions = pool.sub(relays, [
          {
            kinds: [7],
            '#e': [postObj.id],
          },
        ]);

        subscribePostReactions.on('event', (reactionEvent: any) => {
          if (reactionEvent.content === '-') {
            return;
          }

          const likerPubkey = reactionEvent.pubkey;

          setPosts((oldPosts: IPost[]) =>
            oldPosts.map((item) => {
              if (item.id !== postObj.id) {
                return item;
              }

              return {
                ...item,
                reactions: {
                  ...item.reactions,
                  likes: item.reactions?.likes
                    ? [...item.reactions?.likes, { pubkey: likerPubkey }]
                    : [{ pubkey: likerPubkey }],
                },
              };
            })
          );
        });
      });

      subscribeGlobalPosts.on('eose', () => {
        subscribeGlobalPosts.unsub();
      });
    };

    fetchPosts();

    return () => {
      pool.close(relays);
    };
  }, []);

  return (
    <>
      {posts &&
        posts.map((post, index: number) => (
          <PostCard
            key={index}
            id={post.id}
            content={post.content}
            author={post.author}
            reactions={post.reactions}
          />
        ))}
    </>
  );
}
