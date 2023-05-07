import Embed from './index';
import Link from 'next/link';

const SoundCloud: Embed = {
  regex: /(?:https?:\/\/)?(?:www\.)?(soundcloud\.com\/(?!live)[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_]+)(?:\?.*)?/g,
  component: ({ match, index }) => {
    return (
      <iframe
        className="audio"
        scrolling="no"
        key={match + index}
        width="650"
        height="380"
        style={{ maxWidth: '100%' }}
        src={`https://w.soundcloud.com/player/?url=${match}`}
        frameBorder="0"
        allow="encrypted-media"
      />
    );
  }
}

export default SoundCloud;
