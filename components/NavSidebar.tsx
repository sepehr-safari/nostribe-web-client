"use client";

import { nip19 } from 'nostr-tools';
import { usePathname } from 'next/navigation';

import {
  Cog8ToothIcon,
  HomeIcon,
  InformationCircleIcon,
  PaperAirplaneIcon,
  QrCodeIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import {
  Cog8ToothIcon as Cog8ToothIconFull,
  HomeIcon as HomeIconFull,
  InformationCircleIcon as InformationCircleIconFull,
  PaperAirplaneIcon as PaperAirplaneIconFull,
  BellIcon as BellIconFull,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import useStore from "@/store";
import Avatar from "@/components/Avatar";
import Name from "@/components/Name";

export default function NavMenu() {
  const userData = useStore((state) => state.auth.user.data);
  const npub = userData?.publicKey ? nip19.npubEncode(userData.publicKey) : '';
  const pathname = usePathname();

  const APPLICATIONS = [
    { url: '/', text: 'Home', icon: HomeIcon, activeIcon: HomeIconFull },
    { url: '/messages', text: 'Messages', icon: PaperAirplaneIcon, activeIcon: PaperAirplaneIconFull },
    { url: '/notifications', text: 'Notifications', icon: BellIcon, activeIcon: BellIconFull },
    { url: '/settings', text: 'Settings', icon: Cog8ToothIcon, activeIcon: Cog8ToothIconFull },
    {
      url: '/about',
      text: 'About',
      icon: InformationCircleIcon,
      activeIcon: InformationCircleIconFull,
    },
  ];

  return (
    <aside className="sticky top-0 z-20 h-screen max-h-screen hidden md:w-16 lg:w-64 flex-col px-2 py-4 md:flex justify-between">
      <div>
        <nav className="space-y-2 lg:space-y-1">
          <Link href="/" className="flex items-center gap-3 px-2 mb-4">
            <img className="rounded-full w-8" src="/img/icon128.png" />

            <h1 className="hidden lg:flex text-3xl">
              iris
            </h1>
          </Link>
          {APPLICATIONS.map((a, index) => {
            const isActive = a.url === pathname;
            const Icon = isActive ? a.activeIcon : a.icon;
            return (
              <div key={index}>
                <Link
                href={a.url}
                className={`inline-flex w-auto flex items-center space-x-4 p-3 rounded-full transition-colors duration-200 hover:bg-gray-900`}
              >
                <Icon className="w-6 h-6" />
                <span className={`hidden lg:flex`}>{a.text}</span>
                {a.text === 'messages' && (
                  <span className="flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-500 rounded-full">
                    2
                  </span>
                )}
              </Link>
              </div>
            );
          })}
        </nav>
        <div className="flex lg:flex-row md:flex-col gap-2 mt-4">
          <button className="btn btn-primary btn-circle">
            <svg className="w-6 h-6" viewBox="0 0 512 512" fill="currentColor">
              <g>
                <path d="M473.818,0.003c0,0-18.578,28.297-139.938,70.172c-123.719,42.688-199.875,216.406-199.875,216.406 c-18.344,35.578-90.813,183.453-90.813,183.453c-19.953,38.172,16.625,60.734,38.063,21.313 c41.156-75.703,67.688-144.875,130.25-146.844c91.219-2.875,153.609-84.109,133.984-80.359 c-25.844,11.484-82.781,0.875-49.234-4.391c80.531-6.594,130.125-68.297,113.969-72.5c-28.563,11.219-55.172,0.578-60.391-2.656 C491.959,166.987,473.818,0.003,473.818,0.003z"></path>
              </g>
            </svg>
          </button>
          <button className="btn rounded-full btn-circle">
            <QrCodeIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div>
        <Link href={`/profile/${npub}`} className="btn btn-ghost md:max-lg:btn-circle">
          <Avatar pub={userData?.publicKey || ''} width="w-8" />
          <div className="hidden lg:block ml-2">
            <Name pub={userData?.publicKey || ''} />
          </div>
        </Link>
      </div>
    </aside>
  );
}
