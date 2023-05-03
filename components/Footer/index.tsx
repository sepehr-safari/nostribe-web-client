"use client";

import { HomeIcon, PaperAirplaneIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Avatar } from '@/components';
import useStore from "@/store";
import {useProfileContent} from "@/hooks";

const Footer = () => {
  const userData = useStore((state) => state.auth.user.data);
  const { npub } = useProfileContent(userData?.publicKey || '');

  if (!userData?.publicKey) return null;

  return (
    <div className="fixed md:hidden bottom-0 z-10 w-full bg-base-200">
      <div className="flex w-full h-full items-stretch p-4">
        <Link href="/" className="flex-grow flex items-center justify-center">
          <HomeIcon className="h-6 w-6" />
        </Link>
        <Link href="/" className="flex-grow flex items-center justify-center">
          <PaperAirplaneIcon className="h-6 w-6" />
        </Link>
        <Link href="/" className="flex-grow flex items-center justify-center">
          <PlusCircleIcon className="h-6 w-6" />
        </Link>
        {userData?.publicKey && (
          <Link href={`/profile/${npub}`} className="flex-grow flex items-center justify-center">
            <Avatar width="w-8" pub={userData?.publicKey} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Footer;
