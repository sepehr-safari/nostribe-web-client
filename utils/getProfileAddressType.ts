type profileAddressType = 'nip05' | 'nip19' | 'hex' | 'unknown';

const getProfileAddressType = (profileAddress: string): profileAddressType => {
  if (profileAddress.includes('%40')) {
    return 'nip05';
  } else if (profileAddress.startsWith('npub1')) {
    return 'nip19';
  } else if (profileAddress.length === 64) {
    return 'hex';
  } else {
    return 'nip05';
  }
};

export default getProfileAddressType;
