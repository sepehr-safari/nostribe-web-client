'use client';

import {
  ArrowLeftIcon,
} from '@heroicons/react/24/solid';

const navigateBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  window.history.back();
}

const Header = () => {
  return (
    <div className="absolute top-0 z-10 w-full">
      <div className="md:ml-16 lg:w-1/2 lg:mx-auto bg-base-200 bg-opacity-50 shadow-lg backdrop-blur-lg">
        <div className="flex w-full items-center justify-between">
          <div className="p-2">
            <a href="#" onClick={navigateBack}>
              <ArrowLeftIcon width={24} />
            </a>
          </div>
          <div className="flex w-full gap-2 p-3">
            Current page
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
