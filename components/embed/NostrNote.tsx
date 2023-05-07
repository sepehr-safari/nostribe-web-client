import Embed from './index';
import PostCard from "@/components/Post/PostCard";

const eventRegex =
  /(?:^|\s|nostr:|(?:https?:\/\/[\w./]+)|iris\.to\/|snort\.social\/e\/|damus\.io\/)+((?:@)?note[a-zA-Z0-9]{59,60})(?![\w/])/gi;

const NostrUser: Embed = {
  regex: eventRegex,
  component: ({ match, index }) => {
    return (
      <PostCard key={match + index} postId={match} asInlineQuote={true} />
    );
  },
};

export default NostrUser;