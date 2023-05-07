import Image from "./Image";
import Video from "./Video";
import NostrUser from "./NostrUser";
import NostrEvent from "./NostrEvent";

export type EmbedProps = {
  match: string,
  index: number
}

type Embed = {
  regex: RegExp;
  component: (props: EmbedProps) => JSX.Element;
}

export const allEmbeds = [
  Image,
  Video,
  NostrUser,
  NostrEvent,
];

export default Embed;