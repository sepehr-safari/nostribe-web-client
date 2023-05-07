import Embed from './index';
import Link from 'next/link';
import Name from '@/components/Name';

const pubKeyRegex =
  /(?:^|\s|nostr:|(?:https?:\/\/[\w./]+)|iris\.to\/|snort\.social\/p\/|damus\.io\/)+((?:@)?npub[a-zA-Z0-9]{59,60})(?![\w/])/gi;

const NostrNpub: Embed = {
  regex: pubKeyRegex,
  component: ({ match, index }) => {
    return (
      <Link
        key={match + index}
        href={`/profile/${match}`}
        className="text-iris-blue hover:underline mx-1"
      >
        <Name pub={match} />
      </Link>
    );
  },
};

export default NostrNpub;