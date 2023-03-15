import { IPost } from '@/types';

import {
  ArrowPathIcon,
  BoltIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

import Avatar from '../Avatar';

export default function PostCard({ author, content, reactions }: IPost) {
  const imageRegex =
    /(?:https?:\/\/)?(?:www\.)?\S+\.(?:jpg|jpeg|png|gif|bmp)/gi;
  const imageInsideContent = content.match(imageRegex);

  return (
    <>
      <article className="card bg-neutral text-neutral-content shadow-2xl shadow-black">
        <div className="card-body p-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <Avatar
                url={author.profilePicture || '/nostribe.png'}
                width="w-12"
              />

              <div className="flex flex-col">
                {author.name && (
                  <p className="text-lg font-bold">
                    {author.name.slice(0, 35)}
                  </p>
                )}
                {author.nip05 && (
                  <p className="text-sm font-bold bg-gradient-to-r from-warning to-accent text-transparent bg-clip-text">
                    {author.nip05.slice(0, 35)}
                  </p>
                )}
              </div>

              <div className="ml-auto">
                <button className="btn btn-sm btn-ghost gap-2">
                  <PlusIcon width={16} />
                  Follow
                </button>
              </div>
            </div>

            <div className="flex flex-col break-words gap-2 ml-16 mr-2">
              {imageInsideContent && (
                <div className="relative object-contain overflow-hidden w-2/3">
                  <img src={imageInsideContent[0]} />
                </div>
              )}

              {content}
            </div>
          </div>

          <div className="card-actions w-full flex justify-evenly">
            <button className="btn btn-ghost btn-sm px-2 gap-2">
              <BoltIcon width={24} />
              {}
            </button>

            <button className="btn btn-ghost btn-sm px-2 gap-2">
              <ChatBubbleOvalLeftIcon width={24} />
              {}
            </button>

            <button className="btn btn-ghost btn-sm px-2 gap-2">
              <HeartIcon width={24} />

              {reactions?.likes && reactions?.likes.length}
            </button>

            <button className="btn btn-ghost btn-sm px-2 gap-2">
              <ArrowPathIcon width={24} />
              {}
            </button>
          </div>
        </div>
      </article>
    </>
  );
}
