import Embed from './index';
import Name from '@/components/Name';
import PostCard from '@/components/Post/PostCard';
import Link from 'next/link';
import {nip19} from "nostr-tools";

const nip19Regex = /\bnostr:(n(?:event|profile)1\w+)\b/g;

const NostrUser: Embed = {
  regex: nip19Regex,
  component: ({ match, index }) => {
    try {
      const { type, data } = nip19.decode(match);
      if (type === 'nprofile') {
        return (
          <>
            {' '}
            <Link className="text-iris-blue hover:underline" href={`/${data.pubkey}`}>
              <Name key={match + index} pub={data.pubkey} />
            </Link>
          </>
        );
      } else if (type === 'nevent') {
        // same as note
        return (
          <div className="rounded-lg border border-gray-500 my-2">
            <PostCard key={match + index} postId={data.id} asInlineQuote={true} />
          </div>
        );
      }
    } catch (e) {
      console.log(e);
    }
    return <>{match}</>;
  },
};

export default NostrUser;