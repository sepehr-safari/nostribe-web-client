'use client';

import {
  ArrowLeftIcon,
} from '@heroicons/react/24/solid';
import { usePathname, useParams } from 'next/navigation';
import { Name } from '@/components';

const navigateBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  window.history.back();
}

const HomeHeader = () => {
  return (
    <>
      <div className="flex items-center md:hidden gap-2 p-3">
        <img src="/img/icon128.png" className="w-8 rounded-full" />
        Iris
      </div>
      <div className="flex w-full gap-2 p-3 justify-center sm:mr-40 md:mr-0">
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
      <div className="flex w-full gap-2 p-3 justify-center mr-10">
        {title}
      </div>
    </>
  )
}

const Header = () => {
  const pathname = usePathname();
  console.log('pathname', JSON.stringify(pathname));
  return (
    <div className="absolute top-0 z-10 w-full">
      <div className="md:ml-16 lg:w-1/2 lg:mx-auto bg-base-200 bg-opacity-50 shadow-lg backdrop-blur-lg">
        <div className="flex w-full items-center justify-between">
          {pathname.length <= 1 ? <HomeHeader /> : <BackNavHeader/>}
        </div>
      </div>
    </div>
  );
};

export default Header;
