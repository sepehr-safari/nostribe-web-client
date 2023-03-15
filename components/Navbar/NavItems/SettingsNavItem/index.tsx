import Link from 'next/link';

import { Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function SettingsNavItem() {
  return (
    <>
      <Link
        href="/settings"
        className="btn btn-ghost p-3 rounded-full md:rounded-lg"
      >
        <div>
          <Cog6ToothIcon width={24} className="block md:hidden" />
        </div>
        <div className="hidden md:block">Settings</div>
      </Link>
    </>
  );
}
