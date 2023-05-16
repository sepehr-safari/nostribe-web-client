import { Event } from "nostr-tools";
import Image from "./Image";
import Video from "./Video";
import NostrNpub from "./NostrNpub";
import NostrEvent from "./NostrNote";
import Nip19 from "./Nip19";
import InlineMention from "./InlineMention";
import Hashtag from "./Hashtag";
import Url from "./Url";
import Youtube from "./YouTube";
import Instagram from "./Instagram";
import Twitter from "./Twitter";
import SoundCloud from "./SoundCloud";
import Spotify from "./Spotify";

export type EmbedProps = {
  match: string,
  index?: number,
  event?: Event,
  key: string,
}

type Embed = {
  regex: RegExp;
  component: (props: EmbedProps) => JSX.Element;
}

export const allEmbeds = [
  Image,
  Video,
  Youtube,
  Instagram,
  Twitter,
  SoundCloud,
  Spotify,
  NostrNpub,
  NostrEvent,
  Nip19,
  Hashtag,
  InlineMention,
  Url,
];

export default Embed;