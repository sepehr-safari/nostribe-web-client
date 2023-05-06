import useStore from "@/store";
import {useProfileContacts} from "@/hooks";
import {toHexKey} from "@/utils/HexKey";

export default function FollowButton({ pub }: { pub: string }) {
  const userData = useStore((state) => state.auth.user.data);
  const {
    contactEvents,
  } = useProfileContacts(userData?.publicKey || '');

  // TODO probably need faster way to get contact list
  const event = contactEvents[0];
  const hexPub = toHexKey(pub);
  const isFollowing = event?.tags?.some((tag) => tag[0] === "p" && tag[1] === hexPub);
  console.log('hexPub', hexPub, 'event', event, 'isFollowing', isFollowing);
  return (
    <button className="btn btn-sm gap-2">
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  )
}
