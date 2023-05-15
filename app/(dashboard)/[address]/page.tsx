import Post from '@/app/(dashboard)/post/[address]/page';
import Profile from '@/app/(dashboard)/profile/[address]/page';

export const runtime = 'edge';

export default function Address({params}: {params: {address: string}}) {
  if (params.address.startsWith('note')) {
    return <Post params={params} />;
  } else {
    return <Profile params={params} />;
  }
}