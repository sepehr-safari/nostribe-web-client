import { memo, useMemo, useState } from 'react';
import useStore from '@/store';
import { useProfileContacts, useProfileHex } from '@/hooks';
import usePublish from '@/hooks/usePublish';

const FollowButton = memo(({ pub }: { pub: string }) => {
  const [hovering, setHovering] = useState(false);
  const userData = useStore((state) => state.auth.user.data);
  const { latestContactEvent } = useProfileContacts(userData?.publicKey || '');
  const publish = usePublish();
  const hex = useProfileHex(pub);

  const isFollowing = useMemo(() => {
    const isFollowing = latestContactEvent?.tags?.some(
      (tag) => tag[0] === 'p' && tag[1] === hex
    );
    return isFollowing;
  }, [pub, latestContactEvent]);

  // this is re-rendering too much
  // console.log('event', event);

  if (hex === userData?.publicKey) return null;

  const onClick = () => {
    let newTags;
    if (isFollowing) {
      newTags = (latestContactEvent?.tags || []).filter(
        (tag) => tag[0] !== 'p' || tag[1] !== hex
      );
    } else {
      newTags = (latestContactEvent?.tags || []).concat([['p', hex]]);
    }
    publish({
      tags: newTags,
      content: latestContactEvent?.content || '',
      kind: 3,
    });
    console.log('publishing', {
      tags: newTags,
      content: latestContactEvent?.content,
      kind: 3,
    });
  };

  const onMouseOver = () => {
    if (isFollowing) {
      setHovering(true);
    }
  };

  const onMouseOut = () => {
    setHovering(false);
  };

  return (
    <button
      className={`btn btn-sm gap-2 w-24 ${isFollowing ? 'btn-ghost' : ''}`}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {hovering && isFollowing
        ? 'Unfollow'
        : isFollowing
        ? 'Following'
        : 'Follow'}
    </button>
  );
});

FollowButton.displayName = 'FollowButton';
export default FollowButton;
