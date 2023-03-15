import Link from 'next/link';

import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline';

export default function MessageNavItem() {
  return (
    <>
      <Link
        href="/message"
        className="btn btn-ghost p-3 rounded-full md:rounded-lg"
      >
        <div>
          <ChatBubbleOvalLeftIcon width={24} className="block md:hidden" />
        </div>
        <div className="hidden md:block">Message</div>
      </Link>
    </>
  );
}
