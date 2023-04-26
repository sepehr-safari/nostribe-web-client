'use client';

import Link from 'next/link';
import { memo, useEffect, useState } from 'react';

import { UserIcon } from '@heroicons/react/24/outline';

import useStore from '@/store';

const UserEmber = () => {
  const userData = useStore((state) => state.auth.user.data);
  const [hasUser, setHasUser] = useState(false);

  // zustand has a bug with persisting data
  useEffect(() => {
    userData && setHasUser(true);
  }, [userData]);

  return (
    <div className="dropdown-bottom dropdown-left dropdown">
      <label tabIndex={0} className="btn-ghost btn-circle btn">
        <UserIcon width={24} />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box w-32 bg-base-100 p-2 shadow-lg shadow-black"
      >
        {hasUser ? (
          <>
            <li>
              <Link className="text-xs" href="/settings" prefetch={false}>
                Settings
              </Link>
            </li>
            <li>
              <Link className="text-xs" href="/logout" prefetch={false}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link className="text-xs" href="/login" prefetch={false}>
              Login
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default memo(UserEmber);
