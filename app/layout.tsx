import './globals.css';

import { Header, Navbar } from '@/components';

import {
  ArrowsPointingInIcon,
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  LinkIcon,
  PlusIcon,
  TagIcon,
  UsersIcon,
  WifiIcon,
} from '@heroicons/react/24/outline';

export const metadata = {
  title: 'Nostribe',
  description: 'Join the tribe, join the vibe.',
  keywords:
    'Nostribe, Nostr, Nostr protocol, decentralized, censorship-resistant, social media, web client, social network',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    title: 'Nostribe',
    description: 'Join the tribe, join the vibe.',
    images: [
      {
        url: 'https://raw.githubusercontent.com/sepehr-safari/nostribe-web-client/main/public/nostribe.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full w-full" data-theme="nostribish">
      <body className="overflow-x-hidden overflow-y-auto">
        <header className="w-full z-20 shadow-lg shadow-black fixed top-0">
          <Header />

          <Navbar />
        </header>

        <section className="flex justify-center py-2 mt-32">
          <div className="flex w-full max-w-screen-xl justify-between">
            <aside className="hidden lg:flex flex-col w-1/4 p-2 gap-4">
              <div className="card bg-neutral text-neutral-content shadow-2xl shadow-black">
                <div className="card-body p-4">
                  <h2 className="card-title">
                    Relays
                    <LinkIcon width={20} />
                  </h2>

                  <ul className="text-sm my-2">
                    <li className="flex justify-between">
                      <p>wss://relay.damus.io</p>
                      <WifiIcon width={16} />
                    </li>
                    <li className="flex justify-between">
                      <p>wss://eden.nostr.land</p>
                      <WifiIcon width={16} />
                    </li>
                    <li className="flex justify-between">
                      <p>wss://relay.snort.social</p>
                      <WifiIcon width={16} />
                    </li>
                    <li className="flex justify-between">
                      <p>wss://offchain.pub</p>
                      <EllipsisHorizontalIcon width={16} />
                    </li>
                    <li className="flex justify-between">
                      <p>wss://nos.lol</p>
                      <WifiIcon width={16} />
                    </li>
                  </ul>

                  <div className="card-actions justify-end">
                    <button className="btn btn-xs btn-ghost">
                      Manage Relays
                      <ChevronRightIcon width={16} />
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            <main className="flex flex-col w-full md:w-3/4 lg:w-1/2 p-2 gap-4">
              {children}
            </main>

            <aside className="hidden md:flex flex-col md:w-1/4 p-2 gap-4">
              <div className="card bg-neutral text-neutral-content shadow-2xl shadow-black">
                <div className="card-body p-4">
                  <h2 className="card-title">
                    Nostribians
                    <UsersIcon width={20} />
                  </h2>

                  <ul className="text-sm my-2">
                    <li className="flex justify-between">
                      <p>@Himmel</p>
                      <button className="btn btn-ghost btn-xs gap-2">
                        <PlusIcon width={16} />
                        Follow
                      </button>
                    </li>
                    <li className="flex justify-between">
                      <p>@Jack</p>
                      <button className="btn btn-ghost btn-xs gap-2">
                        <PlusIcon width={16} />
                        Follow
                      </button>
                    </li>
                    <li className="flex justify-between">
                      <p>@GIGI</p>
                      <button className="btn btn-ghost btn-xs gap-2">
                        <PlusIcon width={16} />
                        Follow
                      </button>
                    </li>
                  </ul>

                  <div className="card-actions justify-end">
                    <button className="btn btn-xs btn-ghost">
                      Discover More
                      <ChevronRightIcon width={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="card bg-neutral text-neutral-content shadow-2xl shadow-black">
                <div className="card-body p-4">
                  <h2 className="card-title">
                    Popular Chat Rooms
                    <ChatBubbleLeftRightIcon width={20} />
                  </h2>

                  <ul className="text-sm my-2">
                    <li className="flex justify-between">
                      <p>Nostr Lovers</p>
                      <button className="btn btn-ghost btn-xs gap-2">
                        <ArrowsPointingInIcon width={16} />
                        Join
                      </button>
                    </li>
                    <li className="flex justify-between">
                      <p>PV Nostribians</p>
                      <button className="btn btn-ghost btn-xs gap-2">
                        <ArrowsPointingInIcon width={16} />
                        Join
                      </button>
                    </li>
                    <li className="flex justify-between">
                      <p>Coolers</p>
                      <button className="btn btn-ghost btn-xs gap-2">
                        <ArrowsPointingInIcon width={16} />
                        Join
                      </button>
                    </li>
                    <li className="flex justify-between">
                      <p>Satoshi</p>
                      <button className="btn btn-ghost btn-xs gap-2">
                        <ArrowsPointingInIcon width={16} />
                        Join
                      </button>
                    </li>
                  </ul>

                  <div className="card-actions justify-end">
                    <button className="btn btn-xs btn-ghost">
                      Discover More
                      <ChevronRightIcon width={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="card bg-neutral text-neutral-content shadow-2xl shadow-black">
                <div className="card-body p-4">
                  <h2 className="card-title">
                    Popular Tags
                    <TagIcon width={20} />
                  </h2>

                  <ul className="text-sm flex gap-2 flex-wrap my-2">
                    <li>
                      <button className="btn btn-outline btn-xs">nostr</button>
                    </li>
                    <li>
                      <button className="btn btn-outline btn-xs">jack</button>
                    </li>
                    <li>
                      <button className="btn btn-outline btn-xs">zap</button>
                    </li>
                    <li>
                      <button className="btn btn-outline btn-xs">
                        bitcoin
                      </button>
                    </li>
                    <li>
                      <button className="btn btn-outline btn-xs">
                        lightning
                      </button>
                    </li>
                    <li>
                      <button className="btn btn-outline btn-xs">
                        nostribe
                      </button>
                    </li>
                  </ul>

                  <div className="card-actions justify-end">
                    <button className="btn btn-xs btn-ghost">
                      Discover More
                      <ChevronRightIcon width={16} />
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </body>
    </html>
  );
}
