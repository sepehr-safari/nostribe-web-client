import Link from 'next/link';

import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export default function ChatroomNavItem() {
  return (
    <>
      <Link
        href="/chatroom"
        className="btn-ghost btn rounded-full p-3 md:rounded-lg"
      >
        <div>
          <ChatBubbleLeftRightIcon width={24} className="block md:hidden" />
        </div>
        <div className="hidden md:block">Chat Room</div>
      </Link>
    </>
  );
}
