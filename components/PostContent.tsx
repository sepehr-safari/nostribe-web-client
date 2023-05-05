'use client';

import { Event } from 'nostr-tools';
import { useState } from 'react';

import { parseImageUrls } from '@/utils';
import Spinner from './Spinner';

const MSG_TRUNCATE_LENGTH = 500;
const MSG_TRUNCATE_LINES = 8;

const isTooLong = (event: Event, attachments: string[]) => {
  return (
    attachments?.length > 1 ||
    event.content?.length > MSG_TRUNCATE_LENGTH ||
    event.content.split('\n').length > MSG_TRUNCATE_LINES
  );
};

const PostContent = ({ postEvent }: { postEvent: Event }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!postEvent) return <Spinner />;

  const { content } = postEvent;
  const { imageUrlList, imagelessString } = parseImageUrls(content);

  const tooLong = isTooLong(postEvent, imageUrlList);
  const displayedContent = isExpanded || !tooLong ?
    imagelessString : imagelessString.slice(0, MSG_TRUNCATE_LENGTH) + '...';

  return (
    <>
      {imageUrlList.map((imgUrl, index) => (
        <div
          key={index}
          className="relative w-full overflow-hidden object-contain"
        >
          <img className="rounded max-h-96" src={imgUrl} alt={imagelessString.slice(0, 20)} />
        </div>
      ))}

      <p className="whitespace-pre-wrap">{displayedContent}</p>

      {tooLong && (
        <button
          className="text-blue-600 hover:text-blue-800"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </>
  );
};

export default PostContent;
