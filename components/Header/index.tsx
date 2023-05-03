'use client';

import Link from 'next/link';
import {
  ArrowLeftIcon,
} from '@heroicons/react/24/solid';
import { usePathname, useParams } from 'next/navigation';
import { Name } from '@/components';
import useStore from "@/store";

const navigateBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  window.history.back();
}

const NotLoggedInHeader = () => {
  return (
    <>
      <div className="flex items-center md:hidden gap-2 p-3">
        <img src="/img/icon128.png" className="w-8 rounded-full" />
        Iris
      </div>
      <div className="w-full flex items-center justify-end gap-2 p-3 h-14">
        <Link href="/login" className="btn btn-sm btn-primary rounded-full capitalize">Log in</Link>
        <Link href="/login" className="btn btn-sm rounded-full capitalize">Sign up</Link>
      </div>
    </>
  )
}

const HomeHeader = () => {
  return (
    <>
      <div className="flex items-center md:hidden gap-2 p-3">
        <img src="/img/icon128.png" className="w-8 rounded-full" />
        Iris
      </div>
      <div className="w-full flex items-center justify-center gap-2 p-3 sm:mr-40 md:mr-0 h-14">
        Home
      </div>
    </>
  )
}

const BackNavHeader = () => {
  const pathname = usePathname();
  const params = useParams();

  const title = params.address ?
    <Name key={params.address} pub={params.address} /> :
    <span className="capitalize">{pathname.split('/')[1]}</span>;

  return (
    <>
      <div className="p-2">
        <a href="#" onClick={navigateBack}>
          <ArrowLeftIcon width={24} />
        </a>
      </div>
      <div className="w-full flex items-center justify-center gap-2 p-3 mr-10 h-14">
        {title}
      </div>
    </>
  )
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
    <div className="absolute top-0 z-10 w-full">
      <div className="md:ml-16 lg:w-1/2 lg:mx-auto bg-base-200 bg-opacity-50 shadow-lg backdrop-blur-lg">
        <div className="flex w-full items-center justify-between">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Header;
