import Link from 'next/link';

import { HashtagIcon } from '@heroicons/react/24/outline';

export default function ExploreNavItem() {
  return (
    <>
      <Link
        href="/explore"
        className="btn-ghost btn rounded-full p-3 md:rounded-lg"
      >
        <div>
          <HashtagIcon width={24} className="block md:hidden" />
        </div>
        <div className="hidden md:block">Explore</div>
      </Link>
    </>
  );
}
