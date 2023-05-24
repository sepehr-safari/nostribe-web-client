import Embed from './index';
import Link from 'next/link';

const Hashtag: Embed = {
  regex: /(?<=\s|^)(#\w+)/g,
  component: ({ match, index, key, event }) => {
    return (
      <Link
        prefetch={false}
        key={key}
        href={`/search/${encodeURIComponent(match)}`}
        className="text-iris-blue hover:underline"
      >
        {' '}
        {match}{' '}
      </Link>
    );
  },
};

export default Hashtag;
