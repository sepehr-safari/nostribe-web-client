import Embed from './index';
import Name from '@/components/Name';
import PostCard from '@/components/PostCard';
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
            <Link href={`/${data.pubkey}`}>
              <Name key={match + index} pub={data.pubkey} />
            </Link>
          </>
        );
      } else if (type === 'nevent') {
        // same as note
        return <PostCard key={match + index} postId={data.id} asInlineQuote={true} />;
      }
    } catch (e) {
      console.log(e);
    }
    return <>{match}</>;
  },
};

export default NostrUser;