import Embed from './index';
import Link from 'next/link';

const eventRegex =
  /(?:^|\s|nostr:|(?:https?:\/\/[\w./]+)|iris\.to\/|snort\.social\/e\/|damus\.io\/)+((?:@)?note[a-zA-Z0-9]{59,60})(?![\w/])/gi;

const NostrUser: Embed = {
  regex: eventRegex,
  component: ({ match, index }) => {
    return (
      <Link
        key={match + index}
        href={`/post/${match}`}
        className="text-blue-500 hover:underline"
      >
        {match}
      </Link>
    );
  },
};

export default NostrUser;