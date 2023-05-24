'use client';

import { useEffect, useState } from 'react';

import { getProfileHex } from '@/utils';

const useProfileHex = (profileAddress: string | undefined) => {
  const [profileHex, setProfileHex] = useState('');

  useEffect(() => {
    if (!profileAddress) return;

    getProfileHex(profileAddress).then((hex) => {
      setProfileHex(hex);
    });
  }, [profileAddress]);

  return profileHex;
};

export default useProfileHex;
