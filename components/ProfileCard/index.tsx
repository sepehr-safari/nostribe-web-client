'use client';

import { useAuthor } from '@/hooks';
import { PlusIcon } from '@heroicons/react/24/outline';

import Avatar from '../Avatar';

export default function ProfileCard({ id }: { id: string }) {
  const author = useAuthor(id);

  return (
    <>
      <div className="card bg-neutral text-neutral-content shadow-2xl shadow-black">
        <div className="card-body p-4">
          <div className="absolute top-0 left-0 w-full h-48">
            <img
              src={author.banner || '/nostribe.png'}
              className="opacity-80 w-full h-full object-cover rounded-t-box"
            />
          </div>
          <div className="flex flex-col gap-4 pt-36">
            <div className="flex gap-4 items-start">
              <Avatar url={author.picture || '/nostribe.png'} width="w-36" />

              <div className="flex flex-col gap-3 pt-12">
                {author.name && (
                  <div className="text-xl font-bold">{author.name}</div>
                )}

                {author.nip05 && (
                  <div className="text-sm font-bold bg-gradient-to-r from-warning to-accent text-transparent bg-clip-text">
                    {author.nip05}
                  </div>
                )}

                {author.nip05 && (
                  <div className="text-xs">
                    {0} Followers {0} Following
                  </div>
                )}

                {author.about && <div className="text-xs">{author.about}</div>}
              </div>

              <div className="flex h-full ml-auto pt-12 justify-end">
                <button className="btn btn-sm btn-ghost gap-2">
                  <PlusIcon width={16} />
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
