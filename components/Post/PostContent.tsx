'use client';

import { Event } from 'nostr-tools';
import { useState } from 'react';

import Spinner from '../Spinner';
import HyperText from "@/components/HyperText";

const MSG_TRUNCATE_LENGTH = 500;
const MSG_TRUNCATE_LINES = 8;

const isTooLong = (event: Event) => {
  return (
    event.content?.length > MSG_TRUNCATE_LENGTH ||
    event.content.split('\n').length > MSG_TRUNCATE_LINES
  );
};

const PostContent = ({ postEvent, standalone }: { postEvent: Event, standalone: boolean }) => {
  const [isExpanded, setIsExpanded] = useState(standalone);

  if (!postEvent) return <Spinner />;

  const { content } = postEvent;

  const tooLong = !standalone && isTooLong(postEvent);
  const displayedContent = isExpanded || !tooLong ? content : content.slice(0, MSG_TRUNCATE_LENGTH) + '...';

  return (
    <>
      <div className={`whitespace-pre-wrap ${standalone ? 'text-lg' : ''}`}>
        <HyperText event={postEvent}>
          {displayedContent}
        </HyperText>
      </div>

      {tooLong && (
        <button
          className="text-iris-blue hover:underline"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </>
  );
};

export default PostContent;
