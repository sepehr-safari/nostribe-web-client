import { memo, useState, useRef, useEffect } from 'react';
import { Event } from 'nostr-tools';
import Image from '@/components/embed/Image';
import Video from '@/components/embed/Video';
import { PencilSquareIcon, Squares2X2Icon } from "@heroicons/react/24/outline";

import PostCard from '@/components/Post/PostCard';

const PAGE_SIZE = 6;
const LOAD_MORE_MARGIN = '0px 0px 2000px 0px';

type Props = {
  isEmpty?: boolean;
  events: Event[];
}

type DisplayAs = 'feed' | 'grid';

const Feed = ({ isEmpty, events }: Props) => {
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const [displayAs, setDisplayAs] = useState('feed' as DisplayAs);
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

  const renderDisplayAsSelector = () => {
    return (
      <div className="flex my-4">
        <button
          className={`rounded-sm flex justify-center flex-1 p-4 ${displayAs === 'feed' ? 'bg-neutral-900' : ''}`}
          onClick={() => setDisplayAs('feed')}
        >
          <PencilSquareIcon width={24} height={24} />
        </button>
        <button
          className={`rounded-sm flex justify-center flex-1 p-4 ${displayAs === 'grid' ? 'bg-neutral-900' : ''}`}
          onClick={() => setDisplayAs('grid')}
        >
          <Squares2X2Icon width={24} height={24} />
        </button>
      </div>
    );
  }

  const renderGridItem = (imageUrl: string) => {
    return (
      <div key={`global${imageUrl}`} className="w-1/3 p-1">
        <img src={imageUrl} alt="" className="w-full h-auto" />
      </div>
    );
  }

  const renderGrid = () => {
    const imageUrls = events
      .sort((a, b) => b.created_at - a.created_at)
      .flatMap((event) => {
        const matches = event.content.match(Image.regex);
        return matches || [];
      })
      .slice(0, displayCount);

    return (
      <div className="flex flex-wrap -m-1">
        {imageUrls.map(renderGridItem)}
      </div>
    );
  }

  return (
    <>
      {renderDisplayAsSelector()}
      <div ref={lastElementRef}>
        {displayAs === 'grid' ? renderGrid() : (
          events
            .sort((a, b) => b.created_at - a.created_at)
            .slice(0, displayCount)
            .map((postEvent, index, self) => {
              const isLastElement = index === self.length - 1;
              return (
                <div key={`global${postEvent.id}${index}`}>
                  <PostCard postId={postEvent.id} />
                </div>
              );
            })
        )}
      </div>
    </>
  );
};

export default memo(Feed);
