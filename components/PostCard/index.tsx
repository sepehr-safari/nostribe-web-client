import {
  ArrowPathIcon,
  BoltIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

import Avatar from '../Avatar';

import { PropsWithChildren } from 'react';

export default function PostCard({ children }: PropsWithChildren) {
  return (
    <>
      <article className="card bg-neutral text-neutral-content shadow-2xl shadow-black">
        <div className="card-body p-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Avatar url="/nostribe.png" width="w-12" />

              <div className="flex flex-col">
                <p className="text-lg font-bold">Himmel</p>
                <p className="text-sm font-bold bg-gradient-to-r from-warning to-accent text-transparent bg-clip-text">
                  himmel@nostribe.com
                </p>
              </div>

              <div className="ml-auto">
                <button className="btn btn-sm btn-ghost gap-2">
                  <PlusIcon width={16} />
                  Follow
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 ml-14 mr-2">{children}</div>
          </div>

          <div className="card-actions">
            <button className="btn btn-ghost btn-circle">
              <BoltIcon width={24} />
            </button>

            <button className="btn btn-ghost btn-circle">
              <ChatBubbleOvalLeftIcon width={24} />
            </button>

            <button className="btn btn-ghost btn-circle">
              <HeartIcon width={24} />
            </button>

            <button className="btn btn-ghost btn-circle">
              <ArrowPathIcon width={24} />
            </button>
          </div>
        </div>
      </article>
    </>
  );
}
