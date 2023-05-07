import Embed from './index';
import Link from 'next/link';

const Instagram: Embed = {
  regex: /(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)((?:p|reel)\/[\w-]{11})(?:\S+)?/g,
  component: ({ match, index }) => {
    return (
      <iframe
        className="instagram"
        key={match + index}
        width="650"
        height="400"
        style={{ maxWidth: '100%' }}
        src={`https://instagram.com/${match}/embed`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
}

export default Instagram;
