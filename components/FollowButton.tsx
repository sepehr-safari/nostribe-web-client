import useStore from "@/store";
import { useProfileContacts } from "@/hooks";
import { toHexKey } from "@/utils/HexKey";
import usePublish from "@/hooks/usePublish";
import { Event } from "nostr-tools";

export default function FollowButton({ pub }: { pub: string }) {
  const userData = useStore((state) => state.auth.user.data);
  const { contactEvents } = useProfileContacts(userData?.publicKey || "");
  const publish = usePublish();

  const event = contactEvents?.reduce((prev, curr) => {
    if (!prev) return curr;
    if (curr.created_at > prev.created_at) return curr;
    return prev;
  }, null as Event | null);

  const hexPub = toHexKey(pub);
  const isFollowing = event?.tags?.some((tag) => tag[0] === "p" && tag[1] === hexPub);
  console.log("hexPub", hexPub, "event", event, "isFollowing", isFollowing);

  const onClick = () => {
    let newTags;
    if (isFollowing) {
      newTags = (event?.tags || []).filter((tag) => tag[0] !== "p" || tag[1] !== hexPub);
    } else {
      newTags = (event?.tags || []).concat([["p", hexPub]]);
    }
    publish({
      tags: newTags,
      content: event?.content || '',
      kind: 3,
    });
    console.log('publishing', {
      tags: newTags,
      content: event?.content,
      kind: 3,
    });
  };

  return (
    <button className="btn btn-sm gap-2" onClick={onClick}>
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
}
