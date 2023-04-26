'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { memo } from 'react';

import { useProfileContacts, useProfileContent } from '@/hooks';

import {
  Avatar,
  AvatarLoader,
  BoxLoader,
  CardContainer,
  Nip05View,
} from '@/components';

const ProfileCard = ({ profileAddress }: { profileAddress: string }) => {
  const {
    about,
    banner,
    displayName,
    nip05,
    picture,
    website,
    isFetchingMetadata,
  } = useProfileContent(profileAddress);

  const { contactEvents } = useProfileContacts(profileAddress);

  return (
    <>
      <CardContainer>
        <div className="absolute top-0 left-0 h-48 w-full">
          <img
            src={banner || '/nostribe.png'}
            className="rounded-t-box h-full w-full object-cover opacity-80"
            alt={displayName}
          />
        </div>

        <div className="flex flex-col items-center gap-4 pt-36 md:flex-row">
          <div className="md:self-start w-36">
            {isFetchingMetadata ? (
              <AvatarLoader />
            ) : (
              <Avatar url={picture || '/nostribe.png'} width="w-36" />
            )}
          </div>

          <div className="flex w-full flex-col gap-3 md:mt-12">
            <div className="flex flex-wrap">
              <div className="flex flex-col gap-2">
                {displayName ? (
                  <div className="text-xl font-bold">{displayName}</div>
                ) : (
                  isFetchingMetadata && <BoxLoader />
                )}

                {nip05 ? (
                  <Nip05View text={nip05} />
                ) : (
                  isFetchingMetadata && <BoxLoader />
                )}

                {website ? (
                  <a className="text-xs text-info" href={website}>
                    {website}
                  </a>
                ) : (
                  isFetchingMetadata && <BoxLoader />
                )}
              </div>

              <div className="ml-auto flex">
                <button className="btn-ghost btn-sm btn gap-2">
                  <PlusIcon width={16} />
                  Follow
                </button>
              </div>
            </div>

            {contactEvents ? (
              <div className="flex flex-wrap gap-3 text-xs">
                <div>
                  <b>
                    {contactEvents.length ? contactEvents[0].tags.length : 0}
                  </b>
                  {` `}Following
                </div>
                <div>
                  <b>{`*`}</b>
                  {` `}Followers
                </div>
              </div>
            ) : (
              isFetchingMetadata && <BoxLoader />
            )}

            {about ? (
              <div className="break-all text-xs">{about}</div>
            ) : (
              isFetchingMetadata && <BoxLoader />
            )}
          </div>
        </div>
      </CardContainer>
    </>
  );
};

export default ProfileCard;
