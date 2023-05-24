import Embed from './index';
import Name from '@/components/Name';
import PostCard from '@/components/Post/PostCard';
import Link from 'next/link';
import { nip19 } from 'nostr-tools';

const nip19Regex = /\bnostr:(n(?:event|profile)1\w+)\b/g;

const NostrUser: Embed = {
  regex: nip19Regex,
  component: ({ match, index, key }) => {
    try {
      const { type, data } = nip19.decode(match);
      if (type === 'nprofile') {
        return (
          <>
            {' '}
            <Link
              prefetch={false}
              key={key}
              className="text-iris-blue hover:underline"
              href={`/${data.pubkey}`}
            >
              <Name pub={data.pubkey} />
            </Link>
          </>
        );
      } else if (type === 'nevent') {
        // same as note
        return (
          <div key={key} className="rounded-lg border border-gray-500 my-2">
            <PostCard postId={data.id} asInlineQuote={true} />
          </div>
        );
      }
    } catch (e) {
      console.log(e);
    }
    return <span key={key}>{match}</span>;
  },
};

export default NostrUser;
