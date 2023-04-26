import { Event } from 'nostr-tools';

export interface PostData {
  event: Event;
  metadata?: Event;
  reactions?: Event[];
  mentions?: Event[];
}

export interface AuthorData {
  event?: Event;
  contacts?: Event[];
}

export interface IAuthor {
  id: string;
  picture: string;
  name: string;
  displayName: string;
  nip05: string;
  about: string;
  banner: string;
  lud06: string;
  website: string;
  following: string[];
}

// export interface IPost {
//   id: string;
//   content: string;
//   author: {
//     id: string;
//     name?: string;
//     nip05?: string;
//     profilePicture?: string;
//   };
//   reactions?: {
//     likes?: { pubkey: string }[];
//     zaps?: { pubkey: string }[];
//     comments?: { pubkey: string; content: string }[];
//     reposts?: { pubkey: string }[];
//   };
// }
