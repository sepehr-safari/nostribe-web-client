import { Event } from "nostr-tools";
import Image from "./Image";
import Video from "./Video";
import NostrNpub from "./NostrNpub";
import NostrEvent from "./NostrNote";
import Nip19 from "./Nip19";
import InlineMention from "./InlineMention";
import Hashtag from "./Hashtag";
import Url from "./Url";

export type EmbedProps = {
  match: string,
  index?: number,
  event?: Event,
}

type Embed = {
  regex: RegExp;
  component: (props: EmbedProps) => JSX.Element;
}

export const allEmbeds = [
  Image,
  Video,
  NostrNpub,
  NostrEvent,
  Nip19,
  Hashtag,
  InlineMention,
  Url,
];

export default Embed;