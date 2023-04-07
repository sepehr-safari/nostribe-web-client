'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { memo } from 'react';

import { Avatar, CardContainer, Nip05View } from '@/components';

import { AuthorData, IAuthor } from '@/types';

const ProfileCard = ({ data }: { data: AuthorData }) => {
  const { event, contacts } = data;

  if (!event) {
    return <>metadata is not available, try again later.</>;
  }

  const { content } = event;
  const {
    about,
    banner,
    display_name,
    following,
    id,
    lud06,
    name,
    nip05,
    picture,
    website,
  } = JSON.parse(content) as IAuthor;

  const displayName = display_name || name;

  return (
    <>
      <CardContainer>
        <div className="card-body p-4">
          <div className="absolute top-0 left-0 h-48 w-full">
            <img
              src={banner || '/nostribe.png'}
              className="rounded-t-box h-full w-full object-cover opacity-80"
              alt={displayName}
            />
          </div>

          <div className="flex flex-col items-center gap-4 pt-36 md:flex-row">
            <div className="md:self-start">
              <Avatar url={picture || '/nostribe.png'} width="w-36" />
            </div>

            <div className="flex w-full flex-col gap-3 md:mt-12">
              <div className="flex flex-wrap">
                <div className="flex flex-col gap-2">
                  {displayName && (
                    <div className="text-xl font-bold">{displayName}</div>
                  )}

                  {nip05 && <Nip05View text={nip05} />}

                  {website && (
                    <a className="text-xs text-info" href={website}>
                      {website}
                    </a>
                  )}
                </div>

                <div className="ml-auto flex">
                  <button className="btn-ghost btn-sm btn gap-2">
                    <PlusIcon width={16} />
                    Follow
                  </button>
                </div>
              </div>

              {contacts && (
                <div className="flex flex-wrap gap-3 text-xs">
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

              {about && <div className="break-all text-xs">{about}</div>}
            </div>
          </div>
        </div>
      </CardContainer>
    </>
  );
};

export default memo(ProfileCard);
