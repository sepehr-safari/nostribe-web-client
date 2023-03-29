import {
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
  TagIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

// [TODO] replace mock data with real data

export default function DashboardRightSidebar() {
  return (
    <>
      <aside className="hidden md:flex flex-col md:w-1/4 px-2 py-4 gap-4">
        <div className="card bg-neutral text-neutral-content shadow-2xl shadow-black">
          <div className="card-body p-4">
            <h2 className="card-title">
              Tribe
              <UsersIcon width={20} />
            </h2>

            <hr className="opacity-10" />

            <ul className="-ml-2 flex flex-wrap gap-2">
              <li className="btn btn-xs btn-ghost">
                <Link
                  href={
                    '/profile/npub18c556t7n8xa3df2q82rwxejfglw5przds7sqvefylzjh8tjne28qld0we7'
                  }
                >
                  Sepehr
                </Link>
              </li>
              <li className="btn btn-xs btn-ghost">
                <Link
                  href={
                    '/profile/npub1sg6plzptd64u62a878hep2kev88swjh3tw00gjsfl8f237lmu63q0uf63m'
                  }
                >
                  Jack
                </Link>
              </li>
              <li className="btn btn-xs btn-ghost">
                <Link
                  href={
                    '/profile/npub1xtscya34g58tk0z605fvr788k263gsu6cy9x0mhnm87echrgufzsevkk5s'
                  }
                >
                  jb55
                </Link>
              </li>
              <li className="btn btn-xs btn-ghost">
                <Link
                  href={
                    '/profile/npub180cvv07tjdrrgpa0j7j7tmnyl2yr6yr7l8j4s3evf6u64th6gkwsyjh6w6'
                  }
                >
                  fiatjaf
                </Link>
              </li>
              <li className="btn btn-xs btn-ghost">
                <Link
                  href={
                    '/profile/npub1k979np6dcpwh7mkfwk7wq3msezml48fh7wksp9hakakf8pwk3y5qhdz7te'
                  }
                >
                  Andrew
                </Link>
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

            <hr className="opacity-10" />

            <ul className="-ml-2 flex flex-wrap gap-2">
              <li className="btn btn-xs btn-ghost">
                <Link href={'#'}>Nostr Lovers</Link>
              </li>
              <li className="btn btn-xs btn-ghost">
                <Link href={'#'}>Pura Vida!</Link>
              </li>
              <li className="btn btn-xs btn-ghost">
                <Link href={'#'}>Nostribians</Link>
              </li>
              <li className="btn btn-xs btn-ghost">
                <Link href={'#'}>Satoshi</Link>
              </li>
              <li className="btn btn-xs btn-ghost">
                <Link href={'#'}>Zap! Zap! Zap!</Link>
              </li>
              <li className="btn btn-xs btn-ghost">
                <Link href={'#'}>Nostrica</Link>
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

            <hr className="opacity-10" />

            <ul className="-ml-2 flex flex-wrap gap-2">
              <li className="btn btn-xs btn-ghost">
                <Link href={'#'}>nostr</Link>
              </li>
              <li className="btn btn-xs btn-ghost">
                <Link href={'#'}>jack</Link>
              </li>
              <li className="btn btn-xs btn-ghost">
                <Link href={'#'}>bitcoin</Link>
              </li>
              <li className="btn btn-xs btn-ghost">
                <Link href={'#'}>zap</Link>
              </li>
              <li className="btn btn-xs btn-ghost">
                <Link href={'#'}>lightning</Link>
              </li>
              <li className="btn btn-xs btn-ghost">
                <Link href={'#'}>nostribe</Link>
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
    </>
  );
}
