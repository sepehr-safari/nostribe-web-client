'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { Event } from 'nostr-tools';
import { memo } from 'react';

import Avatar from '../Avatar';

import { IAuthor } from '@/types';

const ProfileCard = ({
  metadata,
  contacts,
}: {
  metadata: Event[];
  contacts: Event[];
}) => {
  if (metadata.length === 0) {
    return <>metadata is not available, try again later.</>;
  }

  const profileObject: IAuthor = JSON.parse(metadata[0].content);

  return (
    <>
      <div className="card bg-neutral text-neutral-content shadow-2xl shadow-black">
        <div className="card-body p-4">
          <div className="absolute top-0 left-0 w-full h-48">
            <img
              src={profileObject.banner || '/nostribe.png'}
              className="opacity-80 w-full h-full object-cover rounded-t-box"
              alt={profileObject.name}
            />
          </div>

          <div className="flex flex-col items-center gap-4 pt-36 md:flex-row">
            <Avatar
              url={profileObject.picture || '/nostribe.png'}
              width="w-36"
            />

            <div className="flex flex-col w-full gap-3 md:mt-12">
              <div className="flex flex-wrap">
                <div className="flex flex-col gap-2">
                  {profileObject.name && (
                    <div className="text-xl font-bold">
                      {profileObject.name}
                    </div>
                  )}

                  {profileObject.nip05 && profileObject.nip05.length > 25 ? (
                    <div className="dropdown dropdown-hover">
                      <label tabIndex={0}>
                        <div className="text-sm font-bold bg-gradient-to-r from-warning to-accent text-transparent bg-clip-text">
                          {profileObject.nip05.slice(0, 10) +
                            '...' +
                            profileObject.nip05.slice(-15)}
                        </div>
                      </label>
                      <div
                        tabIndex={0}
                        className="dropdown-content menu p-2 text-xs bg-accent text-accent-content rounded-xl"
                      >
                        {profileObject.nip05}
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm font-bold bg-gradient-to-r from-warning to-accent text-transparent bg-clip-text">
                      {profileObject.nip05}
                    </div>
                  )}
                </div>

                <div className="flex ml-auto">
                  <button className="btn btn-sm btn-ghost gap-2">
                    <PlusIcon width={16} />
                    Follow
                  </button>
                </div>
              </div>

              {contacts && (
                <div className="text-xs flex flex-wrap gap-3">
                  <div>
                    <b>{contacts.length ? contacts[0].tags.length : 0}</b>
                    {` `}Following
                  </div>
                  <div>
                    <b>{`*`}</b>
                    {` `}Followers
                  </div>
                </div>
              )}

              {profileObject.about && (
                <div className="text-xs break-all">{profileObject.about}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ProfileCard);
