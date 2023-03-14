import Image from 'next/image';

import { PostCard } from '@/components';

import logoImage from '../public/nostribe.png';

export default function Feed() {
  return (
    <>
      <PostCard>
        <p>Hi From Nostribe &#128075;</p>
      </PostCard>

      <PostCard>
        <p>
          Nostribe is an open-source web client for the decentralized and
          censorship-resistant Nostr protocol. It provides a social media
          platform for Nostribians to communicate freely and securely. Its
          mission is to foster a transparent tribe where everyone has an equal
          voice and a sense of belonging.
        </p>
      </PostCard>

      <PostCard>
        <Image
          src={logoImage}
          alt="Nostribe Logo"
          width={340}
          height={340}
          placeholder="blur"
          className="rounded-2xl self-center"
        />

        <p>Just generated our logo with Midjourney &#10024;</p>
      </PostCard>
    </>
  );
}
