// mentions like #[3], can refer to event or user

import Embed from './index';
import Link from 'next/link';
import Name from '@/components/Name';
import PostCard from '@/components/Post/PostCard';
import { nip19 } from 'nostr-tools';

const fail = (s: string) => `#[${s}]`;

const InlineMention: Embed = {
  regex: /#\[([0-9]+)]/g,
  component: ({ match, index, event, key }) => {
    if (!event?.tags) {
      console.log('no tags', event);
      return <>{fail(match)}</>;
    }
    const tag = event.tags[parseInt(match)];
    if (!tag) {
      console.log('no matching tag', index, event);
      return <>{fail(match)}</>;
    }
    const [type, id] = tag;
    if (type === 'p') {
      return (
        <Link
          prefetch={false}
          key={key}
          href={`/${nip19.npubEncode(id)}`}
          className="text-iris-blue hover:underline"
        >
          <Name pub={id} />
        </Link>
      );
    } else if (type === 'e') {
      return (
        <div className="rounded-lg border border-neutral-800 my-4">
          <PostCard postId={id} key={id} asInlineQuote={true} />
        </div>
      );
    } else {
      console.log('unknown tag type', type, index, event);
      return <>{fail(match)}</>;
    }
  },
};

export default InlineMention;
