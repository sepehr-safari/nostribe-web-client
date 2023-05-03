'use client';

import { Event } from 'nostr-tools';
import { memo } from 'react';

import { parseImageUrls } from '@/utils';
import Spinner from '../Spinner';

const PostContent = ({ postEvent }: { postEvent: Event }) => {
  if (!postEvent) return <Spinner />;

  const { content } = postEvent;

  const { imageUrlList, imagelessString } = parseImageUrls(content);

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

      <p className="whitespace-pre-wrap">{imagelessString}</p>
    </>
  );
};

export default PostContent;
