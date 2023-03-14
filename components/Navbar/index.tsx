import Link from 'next/link';

import {
  BookmarkIcon,
  ChatBubbleLeftRightIcon,
  ChatBubbleOvalLeftIcon,
  Cog6ToothIcon,
  HashtagIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';

export default function Navbar() {
  return (
    <>
      <nav className="navbar bg-base-100 justify-center">
        <ul className="gap-2">
          <li>
            <Link
              href="/"
              className="btn btn-ghost p-3 rounded-full md:rounded-lg"
            >
              <div>
                <HomeIcon width={24} className="block md:hidden" />
              </div>
              <div className="hidden md:block">Feed</div>
            </Link>
          </li>
          <li>
            <Link
              href="/explore"
              className="btn btn-ghost p-3 rounded-full md:rounded-lg"
            >
              <div>
                <HashtagIcon width={24} className="block md:hidden" />
              </div>
              <div className="hidden md:block">Explore</div>
            </Link>
          </li>
          <li>
            <Link
              href="/message"
              className="btn btn-ghost p-3 rounded-full md:rounded-lg"
            >
              <div>
                <ChatBubbleOvalLeftIcon
                  width={24}
                  className="block md:hidden"
                />
              </div>
              <div className="hidden md:block">Message</div>
            </Link>
          </li>
          <li>
            <Link
              href="/chatroom"
              className="btn btn-ghost p-3 rounded-full md:rounded-lg"
            >
              <div>
                <ChatBubbleLeftRightIcon
                  width={24}
                  className="block md:hidden"
                />
              </div>
              <div className="hidden md:block">Chat Room</div>
            </Link>
          </li>
          <li>
            <Link
              href="/memo"
              className="btn btn-ghost p-3 rounded-full md:rounded-lg"
            >
              <div>
                <BookmarkIcon width={24} className="block md:hidden" />
              </div>
              <div className="hidden md:block">Memo</div>
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className="btn btn-ghost p-3 rounded-full md:rounded-lg"
            >
              <div>
                <Cog6ToothIcon width={24} className="block md:hidden" />
              </div>
              <div className="hidden md:block">Settings</div>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
