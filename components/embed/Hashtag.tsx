import Embed from './index';
import Link from 'next/link';

const Hashtag: Embed = {
  regex: /\b(#\w+)\b/g,
  component: ({ match, index, event }) => {
    return (
      <Link
        key={match + index}
        href={`/search/${encodeURIComponent(match)}`}
        className="text-iris-blue hover:underline"
      >
        {' '}{match}{' '}
      </Link>
    );
  }
}

export default Hashtag;
