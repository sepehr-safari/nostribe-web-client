'use client';

import {
  ChevronRightIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import {CardContainer, Searchbar, Avatar, Name} from '@/components';

const TrendingPosts = () => {
  // https://api.nostr.band/v0/trending/notes json
  const [trendingPosts, setTrendingPosts] = useState([] as any[]);

  useEffect(() => {
    fetch('https://api.nostr.band/v0/trending/notes')
      .then((res) => res.json())
      .then((data) => {
        data.notes && setTrendingPosts(data.notes);
      });
  });

  return (
    <CardContainer>
      <div className="card-body p-4">
        <h2 className="card-title">
          <FireIcon width={20} className="text-iris-orange" />
          Trending 24h
        </h2>

        <hr className="opacity-10" />

        <div className="-ml-2 flex flex-wrap gap-6 text-xs overflow-y-scroll max-h-screen">
          {trendingPosts.map((post) => (
            <Link href={`/post/${post.id}`} key={post.id} className="flex gap-2 w-full break-words">
              <Avatar pub={post.event?.pubkey} width="w-8" />
              <span className="w-full">
                <b><Name pub={post.event?.pubkey} /></b>{' | '}
                <span className="text-gray-400">
                  {post.event?.content?.length > 80 ? `${post.event?.content?.slice(0, 80)}...` : post.event?.content}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </CardContainer>
  )
}

export default function DiscoverSidebar() {
  return (
    <>
      <aside className="hidden flex-col gap-4 z-20 px-2 py-4 lg:flex md:w-1/4 h-screen max-h-screen">
        <Searchbar />
        <TrendingPosts />
      </aside>
    </>
  );
}
