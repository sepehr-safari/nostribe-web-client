import Link from 'next/link';

import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline';

export default function MessageNavItem() {
  return (
    <>
      <Link
        href="/message"
        className="btn-ghost btn rounded-full p-3 md:rounded-lg"
      >
        <div>
          <ChatBubbleOvalLeftIcon width={24} className="block md:hidden" />
        </div>
        <div className="hidden md:block">Message</div>
      </Link>
    </>
  );
}
