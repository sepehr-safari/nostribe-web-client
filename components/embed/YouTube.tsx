import Embed from './index';
import Link from 'next/link';

const YouTube: Embed = {
  regex: /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))([\w-]{11})(?:\S+)?/g,
  component: ({ match, index }) => {
    return (
      <iframe
        key={match + index}
        width="650"
        height="400"
        src={`https://www.youtube.com/embed/${match}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
}

export default YouTube;
