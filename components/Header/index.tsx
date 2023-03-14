import { BellIcon, UserIcon } from '@heroicons/react/24/outline';

import Avatar from '../Avatar';
import Searchbar from '../Searchbar';

export default function Header() {
  return (
    <>
      <nav className="navbar bg-base-100 justify-center">
        <div className="w-full max-w-screen-xl">
          <div className="flex w-full items-center justify-between">
            <div className="flex gap-2 items-center w-1/4">
              <Avatar url="/nostribe.png" />

              <h1 className="font-bold normal-case text-xl">Nostribe</h1>
            </div>

            <div className="flex w-1/4">
              <Searchbar />
            </div>

            <div className="flex w-1/4 justify-end gap-2">
              <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <BellIcon width={24} />
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
              </button>

              <button className="btn btn-ghost btn-circle">
                <UserIcon width={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
