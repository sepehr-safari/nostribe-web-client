type ContentType = 'text' | 'mention';

interface ParsedMentions {
  type: ContentType;
  content: string;
}

export default function parseMentions(text: string) {
  const initial = [{ type: 'text', content: text }] as ParsedMentions[];

  const mentionRegexFromNip10 = /#\[\d+\]/gi; // #[0] , #[1] , ...
  const mentionList = text.match(mentionRegexFromNip10);

  if (!mentionList) return initial;

  const parsedMentions = mentionList.reduce(
    (acc: ParsedMentions[], mention) => {
      const lastItem = acc.pop();

      const splitted = lastItem!.content.split(mention);

      if (splitted[0]) acc.push({ type: 'text', content: splitted[0] });

      if (mention) acc.push({ type: 'mention', content: mention.slice(2, -1) });

      if (splitted[1]) acc.push({ type: 'text', content: splitted[1] });

      return acc;
    },
    initial
  );

  return parsedMentions;
}
