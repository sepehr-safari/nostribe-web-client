import {Event} from "nostr-tools";
import {ArrowPathIcon, BoltIcon, ChatBubbleOvalLeftIcon, HeartIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import {isRepost} from "@/utils/event";

const Reactions = ({ reactionEvents, nip19NoteId }: { reactionEvents: Event[], nip19NoteId: string }) => {
  return (
    <>
      <hr className="-mx-4 mt-2 opacity-10" />

      <div className="-m-4 flex flex-wrap">
        <button className="btn-ghost hover:bg-transparent text-gray-500 hover:text-iris-orange btn w-1/4 content-center gap-2 rounded-none p-2">
          <BoltIcon width={18} />
          {reactionEvents.filter((event) => event.kind === 9735).length}
        </button>

        <Link href={`/post/${nip19NoteId}`} className="btn-ghost hover:bg-transparent text-gray-500 hover:text-iris-blue btn w-1/4 content-center gap-2 rounded-none p-2">
          <ChatBubbleOvalLeftIcon width={18} />
          {reactionEvents.filter((event) => event.kind === 1).length}
        </Link>

        <button className="btn-ghost hover:bg-transparent text-gray-500 hover:text-iris-purple btn w-1/4 content-center gap-2 rounded-none p-2">
          <HeartIcon width={18} />
          {reactionEvents.filter((event) => event.kind === 7).length}
        </button>

        <button className="btn-ghost hover:bg-transparent text-gray-500 hover:text-iris-green btn w-1/4 content-center gap-2 rounded-none p-2">
          <ArrowPathIcon width={18} />
          {reactionEvents.filter((event) => isRepost(event)).length}
        </button>
      </div>
    </>
  )
}

export default Reactions;
