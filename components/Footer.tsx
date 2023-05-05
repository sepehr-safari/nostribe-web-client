"use client";

import {
  HomeIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import {
  MagnifyingGlassIcon as MagnifyingGlassIconFull,
  HomeIcon as HomeIconFull,
  PaperAirplaneIcon as PaperAirplaneIconFull,
} from '@heroicons/react/24/solid';

import Link from 'next/link';
import Avatar from "@/components/Avatar";
import useStore from "@/store";
import {useProfileContent} from "@/hooks";
import { usePathname } from "next/navigation";

const Footer = () => {
  const userData = useStore((state) => state.auth.user.data);
  const { npub } = useProfileContent(userData?.publicKey || '');
  const pathname = usePathname();

  if (!userData?.publicKey) return null;

  return (
    <div className="fixed md:hidden bottom-0 z-10 w-full bg-base-200 pb-safe-area-inset-bottom">
      <div className="flex w-full h-full items-stretch">
        <Link href="/" className="flex-grow flex items-center justify-center p-3">
          {pathname === "/" ? <HomeIconFull className="h-6 w-6" /> : <HomeIcon className="h-6 w-6" />}
        </Link>
        <Link href="/search" className="flex-grow flex items-center justify-center p-3">
          {pathname === "/search" ? <MagnifyingGlassIconFull className="h-6 w-6"/> : <MagnifyingGlassIconFull className="h-6 w-6"/>}
        </Link>
        <Link href="/messages" className="flex-grow flex items-center justify-center p-3">
          {pathname === "/messages" ? <PaperAirplaneIconFull className="h-6 w-6"/> : <PaperAirplaneIcon className="h-6 w-6"/>}
        </Link>
        {/*
        <Link href="/post/new" className="flex-grow flex items-center justify-center p-3">
          {pathname === "/post/new" ? <PlusCircleIconFull className="h-6 w-6"/> : <PlusCircleIcon className="h-6 w-6"/>}
        </Link>
        */}
        {userData?.publicKey && (
          <Link href={`/profile/${npub}`} className="flex-grow flex items-center justify-center p-3">
            <div className={`flex border-2 ${pathname === `/profile/${npub}` ? "border-white rounded-full"  : "border-transparent"}`}>
              <Avatar width="w-6" pub={userData?.publicKey} />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Footer;
