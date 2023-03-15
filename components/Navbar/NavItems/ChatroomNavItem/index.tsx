import Link from 'next/link';

import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export default function ChatroomNavItem() {
  return (
    <>
      <Link
        href="/chatroom"
        className="btn btn-ghost p-3 rounded-full md:rounded-lg"
      >
        <div>
          <ChatBubbleLeftRightIcon width={24} className="block md:hidden" />
        </div>
        <div className="hidden md:block">Chat Room</div>
      </Link>
    </>
  );
}
