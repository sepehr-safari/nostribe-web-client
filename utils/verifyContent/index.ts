import { Event } from 'nostr-tools';

export default function verifyContent(e: Event) {
  const bannedItems = [
    'damus.place',
    'twitterspace',
    'baidu.com',
    'avive.world',
    'Free sats?',
    'dugou',
    'jianhuanghui',
    'https://www.twitterspace.co/?ref=damus',
  ];

  return !bannedItems.find((item) => e.content.includes(item));
}
