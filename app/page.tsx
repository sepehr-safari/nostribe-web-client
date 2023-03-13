import Image from 'next/image';
import logoImage from '../public/nostribe.png';

export default function Home() {
  return (
    <main className="flex flex-col h-full w-full justify-center items-center">
      <Image
        src={logoImage}
        alt="Nostribe Logo"
        width={300}
        height={300}
        placeholder="blur"
        className="rounded-2xl mb-2"
      />

      <div className="text-4xl mb-2">Hi From Nostribe &#128075;</div>
      <div>&#9889; COMING SOON &#9889;</div>
    </main>
  );
}
