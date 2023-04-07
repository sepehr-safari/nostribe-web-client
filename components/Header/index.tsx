import { BellIcon, UserIcon } from '@heroicons/react/24/outline';

import { Avatar, Searchbar } from '@/components';

export default function Header() {
  return (
    <>
      <nav className="navbar justify-center">
        <div className="w-full max-w-screen-xl">
          <div className="flex w-full items-center justify-between">
            <div className="flex w-1/4 items-center gap-2">
              <Avatar url="/nostribe.png" />

              <h1 className="text-lg font-bold normal-case md:text-xl">
                Nostribe
              </h1>
            </div>

            <div className="flex w-1/3 px-2">
              <Searchbar />
            </div>

            <div className="flex w-1/4 justify-end gap-2">
              <button className="btn-ghost btn-circle btn">
                <div className="indicator">
                  <BellIcon width={24} />
                  <span className="badge-primary badge badge-xs indicator-item"></span>
                </div>
              </button>

              <button className="btn-ghost btn-circle btn">
                <UserIcon width={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
