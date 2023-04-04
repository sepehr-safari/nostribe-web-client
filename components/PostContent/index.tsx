import Link from 'next/link';
import { Event, nip19 } from 'nostr-tools';

import { parseImageUrls, parseMentions } from '@/utils';

export default function PostContent({
  event,
}: {
  event: Event & { reactions: Event[]; mentions: Event[] };
}) {
  const eventContent = event.content;
  const eventTags = event.tags;
  const eventMentions = event.mentions;

  const { imageUrlList, imagelessString } = parseImageUrls(eventContent);

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
            eventTags &&
            eventTags.length > tagIndex &&
            eventTags[tagIndex].length > 0;

          if (!isTagValid) return null;

          const isProfileMention = eventTags[tagIndex][0] === 'p';

          if (isProfileMention) {
            const profileHex = eventTags[tagIndex][1];
            const profileNpub = nip19.npubEncode(profileHex);

            const profileContent =
              (eventMentions || []).find((event) => event.pubkey === profileHex)
                ?.content || '{}';
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

          const note = nip19.noteEncode(eventTags[tagIndex][1]);

          return (
            <Link key={mapIndex} href={`/post/${note}`} className="text-info">
              {note}
            </Link>
          );
        })}
      </p>
    </>
  );
}
