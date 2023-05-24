'use client';

import { FireIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import SearchBar from '@/components/SearchBar';
import Avatar from '@/components/Avatar';
import Name from '@/components/Name';
import RelativeTime from '@/components/RelativeTime';
import { nip19 } from 'nostr-tools';
import { useLocalState } from '@/utils/LocalState';

const TrendingPosts = () => {
  // https://api.nostr.band/v0/trending/notes json
  const [trendingPosts, setTrendingPosts] = useState([] as any[]);
  const [mutedUsers] = useLocalState('muted', {});

  useEffect(() => {
    fetch('https://api.nostr.band/v0/trending/notes')
      .then((res) => res.json())
      .then((data) => {
        data.notes && setTrendingPosts(data.notes);
      });
  }, []);

  return (
    <div className="card-body p-4">
      <h2 className="card-title">
        <FireIcon width={20} className="text-iris-orange" />
        Trending 24h
      </h2>

      <hr className="opacity-10" />

      <div className="-ml-2 flex flex-wrap gap-6 text-xs overflow-y-scroll overflow-x-hidden max-h-screen">
        {trendingPosts
          .filter((post) => !mutedUsers[post.event?.pubkey])
          .map((post) => (
            <div key={post.id} className="flex gap-2 w-full break-words">
              <Link href={`/${nip19.npubEncode(post.event?.pubkey)}`}>
                <Avatar pub={post.event?.pubkey} width="w-8" />
              </Link>
              <Link href={`/${nip19.noteEncode(post.id)}`} className="w-full">
                <b>
                  <Name pub={post.event?.pubkey} />
                </b>
                {' | '}
                <span className="text-neutral-400">
                  <RelativeTime
                    date={new Date(post.event?.created_at * 1000)}
                  />
                  <br />
                  {post.event?.content?.length > 80
                    ? `${post.event?.content?.slice(0, 80)}...`
                    : post.event?.content}
                </span>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default function Discover() {
  return (
    <>
      <SearchBar />
      <TrendingPosts />
    </>
  );
}
