import {Event} from "nostr-tools";
import {ArrowPathIcon, BoltIcon, ChatBubbleOvalLeftIcon, HeartIcon} from "@heroicons/react/24/outline";
import {
  ArrowPathIcon as ArrowPathIconFull,
  BoltIcon as BoltIconFull,
  HeartIcon as HeartIconFull,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import {isRepost} from "@/utils/event";
import usePublish from "@/hooks/usePublish";
import useStore from "@/store";
import {useMemo} from "react";

type Props = { event: Event, reactionEvents: Event[], nip19NoteId: string };

const Reactions = ({ reactionEvents, nip19NoteId, event }: Props) => {
  const publish = usePublish();
  const userData = useStore((state) => state.auth.user.data);
  const myPub = userData?.publicKey || '';

  const liked = useMemo(() => {
    if (!myPub) return false;
    return reactionEvents.some((event) => event.kind === 7 && event.pubkey === myPub);
  }, [reactionEvents, myPub]);
  const like = () => {
    publish({
      kind: 7,
      content: '+',
      tags: [['e', event.id], ['p', event.pubkey]],
    });
  }

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

        <button onClick={like} className="btn-ghost hover:bg-transparent text-gray-500 hover:text-iris-purple btn w-1/4 content-center gap-2 rounded-none p-2">
          {liked ? <HeartIconFull className="text-iris-purple" width={18} /> : <HeartIcon width={18}/>}
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
