import { Event } from 'nostr-tools';

export function getThreadRoot(event: Event): string | undefined {
  const rootEvent = event?.tags?.find((t) => t[0] === 'e' && t[3] === 'root')?.[1];
  if (rootEvent) {
    return rootEvent;
  }
  // first e tag
  return event?.tags?.find((t) => t[0] === 'e')?.[1];
}

export function getReplyingToEvent(event: Event): string | undefined {
  const replyTags = event.tags?.filter((tag) => tag[0] === 'e' && tag[3] !== 'mention');
  if (replyTags.length === 1) {
    return replyTags[0][1];
  }
  const replyTag = event.tags?.find((tag) => tag[0] === 'e' && tag[3] === 'reply');
  if (replyTag) {
    return replyTag[1];
  }
  if (replyTags.length > 1) {
    return replyTags[1][1];
  }
  return undefined;
}

export function isRepost(event: Event): boolean {
  // @ts-ignore
  if (event.kind === 6) {
    return true;
  }
  const mentionIndex = event.tags?.findIndex((tag) => tag[0] === 'e' && tag[3] === 'mention');
  if (event.kind === 1 && event.content === `#[${mentionIndex}]`) {
    return true;
  }
  return false;
}