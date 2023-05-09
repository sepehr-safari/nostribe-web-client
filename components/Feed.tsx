import { memo, useState, useRef, useEffect } from 'react';
import { Event } from 'nostr-tools';

import PostCard from '@/components/Post/PostCard';

const PAGE_SIZE = 6;
const LOAD_MORE_MARGIN = '0px 0px 2000px 0px';

type Props = {
  isEmpty?: boolean;
  events: Event[];
}

const Feed = ({ isEmpty, events }: Props) => {
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const lastElementRef = useRef(null);

  useEffect(() => {
    if (events.length < PAGE_SIZE) {
      return;
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting && displayCount < events.length) {
        setDisplayCount((prevCount) => prevCount + PAGE_SIZE);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.0,
      rootMargin: LOAD_MORE_MARGIN,
    });

    const observeLastElement = () => {
      if (lastElementRef.current) {
        observer.observe(lastElementRef.current);
      }
    };

    observeLastElement(); // Observe the new last element

    return () => {
      observer.disconnect();
    };
  }, [events, displayCount, lastElementRef.current]);

  if (isEmpty) return <p>No Posts</p>;

  return (
    <>
      {events
        .sort((a, b) => b.created_at - a.created_at)
        .slice(0, displayCount)
        .map((postEvent, index, self) => {
          const isLastElement = index === self.length - 1;
          return (
            <div
              key={`global${postEvent.id}${index}`}
              ref={isLastElement ? lastElementRef : null}
            >
              <PostCard postId={postEvent.id} />
            </div>
          );
        })}
    </>
  );
};

export default memo(Feed);
