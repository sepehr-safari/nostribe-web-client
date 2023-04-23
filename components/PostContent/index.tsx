import { Event } from 'nostr-tools';
import { memo } from 'react';

import { parseImageUrls } from '@/utils';

const PostContent = ({ noteEvent }: { noteEvent: Event }) => {
  const { content } = noteEvent;

  const { imageUrlList, imagelessString } = parseImageUrls(content);

  return (
    <>
      {imageUrlList.map((imgUrl, index) => (
        <div
          key={index}
          className="relative w-2/3 overflow-hidden object-contain"
        >
          <img src={imgUrl} alt={imagelessString.slice(0, 20)} />
        </div>
      ))}

      <p>{imagelessString}</p>
    </>
  );
};

export default memo(PostContent);
