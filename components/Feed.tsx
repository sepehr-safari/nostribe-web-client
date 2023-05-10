import { memo, useState, useRef, useEffect, useMemo } from 'react';
import { Event } from 'nostr-tools';
import Image from '@/components/embed/Image';
import Video from '@/components/embed/Video';
import { Bars3Icon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import PostCard from '@/components/Post/PostCard';
import Modal from "@/components/modal/Modal";

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
  const [modalImageIndex, setModalImageIndex] = useState(null as number | null);
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

  const imageUrls = useMemo(() => events
    .sort((a, b) => b.created_at - a.created_at)
    .flatMap((event) => {
      const matches = event.content.match(Image.regex);
      return matches || [];
    })
    .slice(0, displayCount), [events, displayCount]);

  const goToPrevImage = () => {
    if (modalImageIndex === null) return;
    const prevImageIndex = (modalImageIndex - 1 + imageUrls.length) % imageUrls.length;
    setModalImageIndex(prevImageIndex);
  };

  const goToNextImage = () => {
    if (modalImageIndex === null) return;
    const nextImageIndex = (modalImageIndex + 1) % imageUrls.length;
    setModalImageIndex(nextImageIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNextImage();
      } else if (e.key === 'ArrowLeft') {
        goToPrevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalImageIndex]);

  if (isEmpty) return <p>No Posts</p>;

  const renderDisplayAsSelector = () => {
    return (
      <div className="flex mb-1 mt-4">
        <button
          className={`rounded-sm flex justify-center flex-1 p-4 ${displayAs === 'feed' ? 'bg-neutral-900' : ''}`}
          onClick={() => {
            setDisplayCount(PAGE_SIZE);
            setDisplayAs('feed');
          }}
        >
          <Bars3Icon width={24} height={24} />
        </button>
        <button
          className={`rounded-sm flex justify-center flex-1 p-4 ${displayAs === 'grid' ? 'bg-neutral-900' : ''}`}
          onClick={() => {
            setDisplayCount(PAGE_SIZE);
            setDisplayAs('grid');
          }}
        >
          <Squares2X2Icon width={24} height={24} />
        </button>
      </div>
    );
  }

  const renderGrid = () => {
    return (
      <div className="grid grid-cols-3 gap-px">
        {imageUrls.map((imageUrl, index) => renderGridItem(imageUrl, index))}
      </div>
    );
  }

  const renderGridItem = (imageUrl: string, index: number) => {
    return (
      <div
        key={`feed${imageUrl}${index}`}
        className="aspect-square cursor-pointer"
        ref={index === imageUrls.length - 1 ? lastElementRef : null}
        onClick={() => {
          setModalImageIndex(index);
        }}
      >
        <img src={imageUrl} alt="" className="w-full h-full object-cover" />
      </div>
    );
  }

  const renderImageModal = () => {
    return modalImageIndex !== null ? (
      <Modal onClose={() => setModalImageIndex(null)}>
        <div className="relative w-full h-full flex justify-center">
          <img className="rounded max-h-[90vh] max-w-[90vw] object-contain" src={imageUrls[modalImageIndex]} />
          <div className="flex items-center justify-between w-full h-full absolute bottom-0 left-0 right-0">
            <div
              className="p-4"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevImage();
              }}
            >
              <button
                className="btn btn-circle btn-sm opacity-25 mr-2 flex-shrink-0"
              >
                <ChevronLeftIcon width={20} />
              </button>
            </div>
            <div
              className="p-4 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                goToNextImage();
              }}
            >
              <button
                className="btn btn-circle btn-sm opacity-25 ml-2 flex-shrink-0"
              >
                <ChevronRightIcon width={20} />
              </button>
            </div>
          </div>
        </div>
      </Modal>
    ) : '';
  }

  return (
    <>
      {renderDisplayAsSelector()}
      {renderImageModal()}
      <div ref={lastElementRef}>
        {displayAs === 'grid' ? renderGrid() : (
          events
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
            })
        )}
      </div>
    </>
  );
};

export default memo(Feed);
