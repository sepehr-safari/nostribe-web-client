'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import useStore from '@/store';

const Logout = () => {
  const router = useRouter();
  const logout = useStore((state) => state.auth.logout);
  const { data } = useStore((state) => state.auth.user);

  useEffect(() => {
    if (!data) {
      router.push('/login');
    } else {
      logout();
    }
  }, [data, router, logout]);

  return <></>;
};

export default Logout;
