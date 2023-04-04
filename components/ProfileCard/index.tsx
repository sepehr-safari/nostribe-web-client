'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { Event } from 'nostr-tools';
import { memo } from 'react';

import { Avatar, CardContainer, Nip05View } from '@/components';

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
      <CardContainer>
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

                  {profileObject.nip05 && (
                    <Nip05View text={profileObject.nip05} />
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
      </CardContainer>
    </>
  );
};

export default memo(ProfileCard);
