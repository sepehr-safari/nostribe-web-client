import Link from 'next/link';
import { nip19 } from 'nostr-tools';
import { memo } from 'react';

import { PostData } from '@/types';

import { parseImageUrls, parseMentions } from '@/utils';

const PostContent = ({ data }: { data: PostData }) => {
  const { event, mentions } = data;
  const { content, tags } = event;

  const { imageUrlList, imagelessString } = parseImageUrls(content);

  const parsedMentions = parseMentions(imagelessString);

  return (
    <>
      {imageUrlList.map((imgUrl, index) => (
        <div
          key={index}
          className="relative object-contain overflow-hidden w-2/3"
        >
          <img src={imgUrl} alt={imagelessString.slice(0, 20)} />
        </div>
      ))}

      <p>
        {parsedMentions.map((value, mapIndex) => {
          if (value.type === 'text')
            return <span key={mapIndex}>{value.content}</span>;

          const tagIndex = +value.content;

          const isTagValid =
            tags && tags.length > tagIndex && tags[tagIndex].length > 0;

          if (!isTagValid) return null;

          const isProfileMention = tags[tagIndex][0] === 'p';

          if (isProfileMention) {
            const profileHex = tags[tagIndex][1];
            const profileNpub = nip19.npubEncode(profileHex);

            const profileContent =
              (mentions || []).find((e) => e.pubkey === profileHex)?.content ||
              '{}';
            const profileObj = JSON.parse(profileContent);
            const profileName = profileObj.name;

            return (
              <Link
                key={mapIndex}
                href={`/profile/${profileNpub}`}
                className="text-info"
              >
                @{profileName || profileNpub}
              </Link>
            );
          }

          const note = nip19.noteEncode(tags[tagIndex][1]);

          return (
            <Link key={mapIndex} href={`/post/${note}`} className="text-info">
              {note}
            </Link>
          );
        })}
      </p>
    </>
  );
};

export default memo(PostContent);
