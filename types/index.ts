export interface IPost {
  id: string;
  content: string;
  author: {
    pubkey: string;
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
