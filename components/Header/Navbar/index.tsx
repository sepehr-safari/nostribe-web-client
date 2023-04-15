import {
  BookmarkIcon,
  ChatBubbleLeftRightIcon,
  ChatBubbleOvalLeftIcon,
  Cog6ToothIcon,
  HashtagIcon,
  HomeIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

import NavItem from './NavItem';

export default function Navbar() {
  return (
    <>
      <nav className="navbar justify-center">
        <ul className="gap-2">
          <li>
            <NavItem label="Feed" href="/" icon={<HomeIcon />} />
          </li>
          <li>
            <NavItem label="Explore" href="/explore" icon={<HashtagIcon />} />
          </li>
          <li>
            <NavItem
              label="Chat Room"
              href="/chatroom"
              icon={<ChatBubbleLeftRightIcon />}
            />
          </li>
          <li>
            <NavItem label="Memo" href="/memo" icon={<BookmarkIcon />} />
          </li>
          <li>
            <NavItem
              label="Message"
              href="/message"
              icon={<ChatBubbleOvalLeftIcon />}
            />
          </li>
          <li>
            <NavItem label="Me" href="/me" icon={<UserIcon />} />
          </li>
          <li>
            <NavItem
              label="Settings"
              href="/settings"
              icon={<Cog6ToothIcon />}
            />
          </li>
        </ul>
      </nav>
    </>
  );
}
