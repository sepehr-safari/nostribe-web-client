import Embed from './index';
import PostCard from "@/components/Post/PostCard";

const eventRegex =
  /(?:^|\s|nostr:|(?:https?:\/\/[\w./]+)|iris\.to\/|snort\.social\/e\/|damus\.io\/)+((?:@)?note[a-zA-Z0-9]{59,60})(?![\w/])/gi;

const NostrUser: Embed = {
  regex: eventRegex,
  component: ({ match, index, key }) => {
    console.log('match', match);
    return (
      <div key={key} className="rounded-lg border border-neutral-800 my-4">
        <PostCard postId={match.replace('@', '')} asInlineQuote={true} />
      </div>
    );
  },
};

export default NostrUser;