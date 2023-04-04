import {
  ChatroomNavItem,
  ExploreNavItem,
  FeedNavItem,
  MemoNavItem,
  MessageNavItem,
  SettingsNavItem,
} from './NavItems';

export default function Navbar() {
  return (
    <>
      <nav className="navbar justify-center">
        <ul className="gap-2">
          <li>
            <FeedNavItem />
          </li>
          <li>
            <ExploreNavItem />
          </li>
          <li>
            <MessageNavItem />
          </li>
          <li>
            <ChatroomNavItem />
          </li>
          <li>
            <MemoNavItem />
          </li>
          <li>
            <SettingsNavItem />
          </li>
        </ul>
      </nav>
    </>
  );
}
