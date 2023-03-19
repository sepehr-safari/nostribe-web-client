export interface IPost {
  id: string;
  content: string;
  author: {
    id: string;
    name?: string;
    nip05?: string;
    profilePicture?: string;
  };
  reactions?: {
    likes?: { pubkey: string }[];
    zaps?: { pubkey: string }[];
    comments?: { pubkey: string; content: string }[];
    reposts?: { pubkey: string }[];
  };
}

export interface IAuthor {
  id: string;
  picture: string;
  name: string;
  nip05: string;
  about: string;
  banner: string;
  lud06: string;
  website: string;
  following: string[];
}
