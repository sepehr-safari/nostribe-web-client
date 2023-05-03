'use client';

import Link from 'next/link';
import { memo, useEffect, useState } from 'react';

import { Avatar, Name } from '@/components';

import useStore from '@/store';

const UserEmber = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const userData = useStore((state) => state.auth.user.data);
  const [hasUser, setHasUser] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // zustand has a bug with persisting data
  useEffect(() => {
    userData && setHasUser(true);
  }, [userData]);

  return (
    <div className="flex items-center dropdown-top dropdown-right dropdown">
      <label tabIndex={0} className="btn-ghost btn-circle btn" onClick={toggleDropdown}>
        <Avatar pub={userData?.publicKey || ''} width="w-8" />
      </label>
      <div className="hidden md:block ml-2">
        <Name pub={userData?.publicKey || ''} />
      </div>
      <ul
        tabIndex={0}
        className={`z-50 dropdown-content menu rounded-box w-32 bg-base-100 p-2 shadow-lg shadow-black ${
          dropdownVisible ? '' : 'hidden'
        }`}
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
