import {Event} from "nostr-tools";
import {EllipsisHorizontalIcon} from "@heroicons/react/24/outline";

const Dropdown = ({ nip19NoteId, postEvent }: { nip19NoteId: string, postEvent: Event }) => {
  return (
    <div className="ml-auto">
      <div className="dropdown-left dropdown">
        <label tabIndex={0} className="btn-ghost btn-circle btn m-1 text-neutral-500">
          <EllipsisHorizontalIcon width={24} />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box w-40 bg-base-100 p-2 shadow-lg shadow-black"
        >
          <li>
            <button
              className="text-start text-xs"
              onClick={() =>
                navigator.clipboard.writeText(
                  `${location.origin}/${nip19NoteId}`
                )
              }
            >
              Copy Link
            </button>
          </li>
          <li>
            <button
              className="text-start text-xs"
              onClick={() =>
                navigator.clipboard.writeText(nip19NoteId)
              }
            >
              Copy ID
            </button>
          </li>
          <li>
            <button
              className="text-start text-xs"
              onClick={() =>
                navigator.clipboard.writeText(JSON.stringify(postEvent))
              }
            >
              Copy Raw Data
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Dropdown;
