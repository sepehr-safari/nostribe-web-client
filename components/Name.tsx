'use client';

import { useProfileContent } from '@/hooks';

export default function Name({ pub }: { pub: string }) {
  let { name, displayName } = useProfileContent(pub);

  return <>{displayName || name || ''}</>;
}
