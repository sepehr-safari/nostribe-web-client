import {
  ArrowsPointingInIcon,
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
  PlusIcon,
  TagIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

export default function DashboardRightSidebar() {
  //
  return (
    <>
      <aside className="hidden md:flex flex-col md:w-1/4 px-2 py-4 gap-4">
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
                <button className="btn btn-outline btn-xs">bitcoin</button>
              </li>
              <li>
                <button className="btn btn-outline btn-xs">lightning</button>
              </li>
              <li>
                <button className="btn btn-outline btn-xs">nostribe</button>
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
