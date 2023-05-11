'use client';

import Link from 'next/link';
import {
  HeartIcon
} from '@heroicons/react/24/outline';
import {
  ArrowLeftIcon,
  Cog8ToothIcon,
} from '@heroicons/react/24/solid';
import { usePathname, useParams } from 'next/navigation';
import Name from "@/components/Name";
import useStore from "@/store";
import React, {MouseEventHandler} from "react";
import {toHexKey} from "@/utils/hexKey";

const navigateBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  window.history.back();
}

const NotLoggedInHeader = () => {
  return (
    <>
      <div className="flex items-center md:hidden gap-2 p-3 text-2xl">
        <img src="/img/icon128.png" className="w-8 rounded-full" />
        iris
      </div>
      <div className="w-full flex items-center justify-end gap-2 p-2 h-14">
        <Link href="/login" className="btn btn-sm btn-primary">Log in</Link>
        <Link href="/signup" className="btn btn-sm">Sign up</Link>
      </div>
    </>
  )
}

const HomeHeader = () => {
  return (
    <>
      <div className="flex items-center md:hidden gap-2 px-4 p-3 text-2xl mr-3">
        <img src="/img/icon128.png" className="w-8 rounded-full" />
        iris
      </div>
      <div className="hidden md:flex w-full flex items-center justify-center gap-2 p-3 mr-16 md:mr-0 h-14">
        Home
      </div>
      <Link href="/notifications" className="md:hidden items-center py-3 px-4">
        <HeartIcon width={28} />
      </Link>
    </>
  )
}

const BackNavHeader = () => {
  const pathname = usePathname();
  const params = useParams();
  const userData = useStore((state) => state.auth.user.data);

  let title: string | JSX.Element = pathname.split('/')[1];
  if (pathname.startsWith('/npub') && params.address) {
    title = <Name key={params.address} pub={params.address}/>;
  } else if (pathname.startsWith('/note')) {
    title = 'Post';
  }

  const isMyProfile = pathname.startsWith('/npub') && toHexKey(params.address) === userData?.publicKey;

  return (
    <>
      <div className="p-2">
        <a href="components/Header#" onClick={navigateBack}>
          <ArrowLeftIcon width={24} />
        </a>
      </div>
      <div className={`w-full flex items-center justify-center gap-2 p-3 h-14 md:mr-10 ${isMyProfile ? 'sm:max-md:ml-2' : 'mr-10'}`}>
        {title}
      </div>
      {isMyProfile && (
        <div className="md:hidden flex items-center gap-2 p-3">
          <Link href="/settings">
            <Cog8ToothIcon width={28} />
          </Link>
        </div>
      )}
    </>
  );
}

const scrollUp: MouseEventHandler = (e) => {
  const target = e.target as HTMLElement;
  const selectors = ['a', 'input', 'button', '.btn'];

  const isMatch = selectors.some((selector) => target.closest(selector));

  if (!isMatch) {
    window.scrollTo(0, 0);
  }
}

const Header = () => {
  const pathname = usePathname();
  const userData = useStore((state) => state.auth.user.data);

  let content;
  if (!userData?.publicKey) {
    content = <NotLoggedInHeader />;
  } else if (pathname.length <= 1) {
    content = <HomeHeader />;
  } else {
    content = <BackNavHeader />;
  }

  return (
    <div className="sticky top-0 z-10 w-full cursor-pointer" onClick={scrollUp}>
      <div className="w-full bg-base-200 bg-black md:bg-opacity-50 md:shadow-lg md:backdrop-blur-lg">
        <div className="flex w-full items-center justify-between">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Header;
