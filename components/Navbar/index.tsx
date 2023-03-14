import Link from 'next/link';

export default function Navbar() {
  return (
    <>
      <nav className="navbar bg-base-100 justify-center">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <Link href="/" className="btn btn-ghost">
              Feed
            </Link>
          </li>
          <li>
            <Link href="/explore" className="btn btn-ghost">
              Explore
            </Link>
          </li>
          <li>
            <Link href="/message" className="btn btn-ghost">
              Message
            </Link>
          </li>
          <li>
            <Link href="/chatroom" className="btn btn-ghost">
              Chat Room
            </Link>
          </li>
          <li>
            <Link href="/memo" className="btn btn-ghost">
              Memo
            </Link>
          </li>
          <li>
            <Link href="/settings" className="btn btn-ghost">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
