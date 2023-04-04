import {
  ChevronRightIcon,
  LinkIcon,
  WifiIcon,
} from '@heroicons/react/24/outline';

import { CardContainer } from '@/components';

// [TODO]: get relays from state
const relays = [
  'wss://relay.damus.io',
  'wss://relay.snort.social',
  'wss://eden.nostr.land',
  'wss://relay.nostr.info',
  'wss://offchain.pub',
  'wss://nostr-pub.wellorder.net',
  'wss://nostr.fmt.wiz.biz',
  'wss://nos.lol',
];

export default function DashboardLeftSidebar() {
  return (
    <>
      <aside className="hidden lg:flex flex-col w-1/4 px-2 py-4 gap-4">
        <CardContainer>
          <div className="card-body p-4">
            <h2 className="card-title">
              Relays
              <LinkIcon width={20} />
            </h2>

            <hr className="opacity-10" />

            <ul className="text-sm">
              {relays.map((relay, index) => (
                <li key={index} className="flex justify-between">
                  <p>{relay}</p>
                  <WifiIcon width={16} />
                </li>
              ))}
            </ul>

            <div className="card-actions justify-end">
              <button className="btn btn-xs btn-ghost">
                Manage Relays
                <ChevronRightIcon width={16} />
              </button>
            </div>
          </div>
        </CardContainer>
      </aside>
    </>
  );
}
