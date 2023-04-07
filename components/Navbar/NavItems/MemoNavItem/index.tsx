import Link from 'next/link';

import { BookmarkIcon } from '@heroicons/react/24/outline';

export default function MemoNavItem() {
  return (
    <>
      <Link
        href="/memo"
        className="btn-ghost btn rounded-full p-3 md:rounded-lg"
      >
        <div>
          <BookmarkIcon width={24} className="block md:hidden" />
        </div>
        <div className="hidden md:block">Memo</div>
      </Link>
    </>
  );
}
