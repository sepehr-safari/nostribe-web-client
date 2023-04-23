import { getProfileHex } from '@/utils';
import { useEffect, useState } from 'react';

const useProfileHex = (address: string) => {
  const [profileHex, setProfileHex] = useState('');

  useEffect(() => {
    if (!address) return;

    getProfileHex(address).then((hex) => {
      setProfileHex(hex);
    });
  }, [address]);

  return profileHex;
};

export default useProfileHex;
