import { nip05, nip19 } from 'nostr-tools';

import { getProfileAddressType } from '@/utils/index';

export default async function getProfileHex(profileAddress: string) {
  const profileAddressType = getProfileAddressType(profileAddress);

  if (profileAddressType === 'nip05') {
    profileAddress = profileAddress.replace('%40', '@');
    if (!profileAddress.includes('@')) {
      if (profileAddress.includes('.')) {
        profileAddress = '_@' + profileAddress;
      } else {
        profileAddress += '@iris.to';
      }
    }

    const profile = await nip05.queryProfile(profileAddress);

    if (!profile || !profile.pubkey) throw new Error('profile not found');

    return profile.pubkey;
  } else if (profileAddressType === 'nip19') {
    const { data } = nip19.decode(profileAddress);

    if (!data) throw new Error('profile not found');

    return data.toString();
  } else if (profileAddressType === 'hex') {
    return profileAddress;
  } else {
    throw new Error('profile not found');
  }
}
