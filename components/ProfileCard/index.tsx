'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { Event } from 'nostr-tools';
import { memo } from 'react';

import Avatar from '../Avatar';

import { IAuthor } from '@/types';

const ProfileCard = ({
  profileEvent,
  contactsEvent,
}: {
  profileEvent: Event;
  contactsEvent: Event;
}) => {
  const profileObject: IAuthor = JSON.parse(profileEvent.content);

  return (
    <>
      <div className="card bg-neutral text-neutral-content shadow-2xl shadow-black">
        <div className="card-body p-4">
          <div className="absolute top-0 left-0 w-full h-48">
            <img
              src={profileObject.banner || '/nostribe.png'}
              className="opacity-80 w-full h-full object-cover rounded-t-box"
            />
          </div>
          <div className="flex flex-col gap-4 pt-36">
            <div className="flex gap-4 items-start">
              <Avatar
                url={profileObject.picture || '/nostribe.png'}
                width="w-36"
              />

              <div className="flex flex-col w-full gap-3 pt-12">
                {profileObject.name && (
                  <div className="text-xl font-bold">{profileObject.name}</div>
                )}

                {profileObject.nip05 && (
                  <div className="text-sm font-bold bg-gradient-to-r from-warning to-accent text-transparent bg-clip-text">
                    {profileObject.nip05}
                  </div>
                )}

                {contactsEvent && (
                  <div className="text-xs flex flex-wrap gap-3">
                    <div>
                      <b>{contactsEvent.tags.length}</b> Following
                    </div>
                    <div>
                      <b>{0}</b> Followers
                    </div>
                  </div>
                )}

                {profileObject.about && (
                  <div className="text-xs break-all">{profileObject.about}</div>
                )}
              </div>

              <div className="flex h-full ml-auto pt-12 justify-end">
                <button className="btn btn-sm btn-ghost gap-2">
                  <PlusIcon width={16} />
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ProfileCard);
