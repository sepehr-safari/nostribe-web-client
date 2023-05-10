import Embed from './index';
import PostCard from "@/components/Post/PostCard";

const eventRegex =
  /(?:^|\s|nostr:|(?:https?:\/\/[\w./]+)|iris\.to\/|snort\.social\/e\/|damus\.io\/)+((?:@)?note[a-zA-Z0-9]{59,60})(?![\w/])/gi;

const NostrUser: Embed = {
  regex: eventRegex,
  component: ({ match, index }) => {
    console.log('match', match);
    return (
      <div className="rounded-lg border border-neutral-800 my-4">
        <PostCard key={match + index} postId={match} asInlineQuote={true} />
      </div>
    );
  },
};

export default NostrUser;