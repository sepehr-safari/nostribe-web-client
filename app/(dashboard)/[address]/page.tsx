'use client';

import PostPage from '@/components/PostPage';
import ProfilePage from '@/components/ProfilePage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'edge';

export default function Address({ params }: { params: { address: string } }) {
  if (params.address.startsWith('note')) {
    return <PostPage address={params.address} />;
  } else {
    return <ProfilePage address={params.address} />;
  }
}
