import { Event } from "nostr-tools";
import Image from "./Image";
import Video from "./Video";
import NostrNpub from "./NostrNpub";
import NostrEvent from "./NostrNote";
import Nip19 from "./Nip19";
import InlineMention from "@/components/embed/InlineMention";

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
  InlineMention,
];

export default Embed;