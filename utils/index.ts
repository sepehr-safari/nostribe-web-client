import { Event, nip05, nip19 } from 'nostr-tools';

export function isVerifiedContent(e: Event) {
  const bannedItems = [
    'damus.place',
    'twitterspace',
    'baidu.com',
    'avive.world',
    'Free sats?',
    'dugou',
    'jianhuanghui',
  ];

  return !bannedItems.find((item) => e.content.includes(item));
}

export async function getProfileHex(id: string) {
  if (id.includes('%40')) {
    // nip05
    const profile = await nip05.queryProfile(id.replace('%40', '@'));

    if (!profile || !profile.pubkey) return null;

    return profile.pubkey;
  } else if (id.startsWith('npub1')) {
    // nip19
    const { data } = nip19.decode(id);

    return data.toString();
  } else {
    return id;
  }
}
