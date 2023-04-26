'use client';

import Link from 'next/link';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export default function NavItem({ label, href, icon }: NavItem) {
  return (
    <>
      <Link
        href={href}
        className="btn-ghost btn rounded-full p-3 md:rounded-lg"
        prefetch={false}
      >
        <div className="block w-6 md:hidden">{icon}</div>
        <div className="hidden md:block">{label}</div>
      </Link>
    </>
  );
}
