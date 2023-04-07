import Link from 'next/link';

import { HomeIcon } from '@heroicons/react/24/outline';

export default function FeedNavItem() {
  return (
    <>
      <Link href="/" className="btn-ghost btn rounded-full p-3 md:rounded-lg">
        <div>
          <HomeIcon width={24} className="block md:hidden" />
        </div>
        <div className="hidden md:block">Feed</div>
      </Link>
    </>
  );
}
