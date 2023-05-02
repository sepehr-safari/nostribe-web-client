'use client';

import {
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
  TagIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

import {CardContainer, Searchbar} from '@/components';

// [TODO] replace mock data with real data

export default function DiscoverSidebar() {
  return (
    <>
      <aside className="hidden flex-col gap-4 z-20 px-2 py-4 lg:flex md:w-1/4">
        <Searchbar />
        <CardContainer>
          <div className="card-body p-4">
            <h2 className="card-title">
              Tribe
              <UsersIcon width={20} />
            </h2>

            <hr className="opacity-10" />

            <ul className="-ml-2 flex flex-wrap gap-2">
              <li className="btn-ghost btn-xs btn">
                <Link
                  href={
                    '/profile/npub18c556t7n8xa3df2q82rwxejfglw5przds7sqvefylzjh8tjne28qld0we7'
                  }
                  prefetch={false}
                >
                  Sepehr
                </Link>
              </li>
              <li className="btn-ghost btn-xs btn">
                <Link
                  href={
                    '/profile/npub1sg6plzptd64u62a878hep2kev88swjh3tw00gjsfl8f237lmu63q0uf63m'
                  }
                  prefetch={false}
                >
                  Jack
                </Link>
              </li>
              <li className="btn-ghost btn-xs btn">
                <Link
                  href={
                    '/profile/npub1xtscya34g58tk0z605fvr788k263gsu6cy9x0mhnm87echrgufzsevkk5s'
                  }
                  prefetch={false}
                >
                  jb55
                </Link>
              </li>
              <li className="btn-ghost btn-xs btn">
                <Link
                  href={
                    '/profile/npub180cvv07tjdrrgpa0j7j7tmnyl2yr6yr7l8j4s3evf6u64th6gkwsyjh6w6'
                  }
                  prefetch={false}
                >
                  fiatjaf
                </Link>
              </li>
              <li className="btn-ghost btn-xs btn">
                <Link
                  href={
                    '/profile/npub1k979np6dcpwh7mkfwk7wq3msezml48fh7wksp9hakakf8pwk3y5qhdz7te'
                  }
                  prefetch={false}
                >
                  Andrew
                </Link>
              </li>
            </ul>

            <div className="card-actions justify-end">
              <button className="btn-ghost btn-xs btn">
                Discover More
                <ChevronRightIcon width={16} />
              </button>
            </div>
          </div>
        </CardContainer>

        <CardContainer>
          <div className="card-body p-4">
            <h2 className="card-title">
              Popular Chat Rooms
              <ChatBubbleLeftRightIcon width={20} />
            </h2>

            <hr className="opacity-10" />

            <ul className="-ml-2 flex flex-wrap gap-2">
              <li className="btn-ghost btn-xs btn">
                <Link href={'#'} prefetch={false}>
                  Nostr Lovers
                </Link>
              </li>
              <li className="btn-ghost btn-xs btn">
                <Link href={'#'} prefetch={false}>
                  Pura Vida!
                </Link>
              </li>
              <li className="btn-ghost btn-xs btn">
                <Link href={'#'} prefetch={false}>
                  Nostribians
                </Link>
              </li>
              <li className="btn-ghost btn-xs btn">
                <Link href={'#'} prefetch={false}>
                  Satoshi
                </Link>
              </li>
              <li className="btn-ghost btn-xs btn">
                <Link href={'#'} prefetch={false}>
                  Zap! Zap! Zap!
                </Link>
              </li>
              <li className="btn-ghost btn-xs btn">
                <Link href={'#'} prefetch={false}>
                  Nostrica
                </Link>
              </li>
            </ul>

            <div className="card-actions justify-end">
              <button className="btn-ghost btn-xs btn">
                Discover More
                <ChevronRightIcon width={16} />
              </button>
            </div>
          </div>
        </CardContainer>

        <CardContainer>
          <div className="card-body p-4">
            <h2 className="card-title">
              Popular Tags
              <TagIcon width={20} />
            </h2>

            <hr className="opacity-10" />

            <ul className="-ml-2 flex flex-wrap gap-2">
              <li className="btn-ghost btn-xs btn">
                <Link href={'#'} prefetch={false}>
                  nostr
                </Link>
              </li>
              <li className="btn-ghost btn-xs btn">
                <Link href={'#'} prefetch={false}>
                  jack
                </Link>
              </li>
              <li className="btn-ghost btn-xs btn">
                <Link href={'#'} prefetch={false}>
                  bitcoin
                </Link>
              </li>
              <li className="btn-ghost btn-xs btn">
                <Link href={'#'} prefetch={false}>
                  zap
                </Link>
              </li>
              <li className="btn-ghost btn-xs btn">
                <Link href={'#'} prefetch={false}>
                  lightning
                </Link>
              </li>
              <li className="btn-ghost btn-xs btn">
                <Link href={'#'} prefetch={false}>
                  nostribe
                </Link>
              </li>
            </ul>

            <div className="card-actions justify-end">
              <button className="btn-ghost btn-xs btn">
                Discover More
                <ChevronRightIcon width={16} />
              </button>
            </div>
          </div>
        </CardContainer>
      </aside>
    </>
  );
}
