'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { useNostrSubscribe } from 'nostr-hooks';
import { Event } from 'nostr-tools';
import { memo } from 'react';

import { IAuthor } from '@/types';

import {
  Avatar,
  AvatarLoader,
  BoxLoader,
  CardContainer,
  Nip05View,
} from '@/components';

const relays = [
  'wss://relay.damus.io',
  'wss://relay.snort.social',
  'wss://eden.nostr.land',
  'wss://relay.nostr.info',
  'wss://offchain.pub',
  'wss://nostr-pub.wellorder.net',
  'wss://nostr.fmt.wiz.biz',
  'wss://nos.lol',
];

const ProfileView = ({
  metadataEvents,
  contactEvents,
  isFetching,
}: {
  metadataEvents: Event[];
  contactEvents: Event[];
  isFetching: boolean;
}) => {
  const profileObject: IAuthor =
    metadataEvents.length > 0 && JSON.parse(metadataEvents[0].content || '{}');

  const {
    about,
    banner,
    display_name: displayName = profileObject.name,
    following,
    id,
    lud06,
    name,
    nip05,
    picture,
    website,
  } = profileObject;

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
            {isFetching ? (
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
                  isFetching && <BoxLoader />
                )}

                {nip05 ? (
                  <Nip05View text={nip05} />
                ) : (
                  isFetching && <BoxLoader />
                )}

                {website ? (
                  <a className="text-xs text-info" href={website}>
                    {website}
                  </a>
                ) : (
                  isFetching && <BoxLoader />
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
              isFetching && <BoxLoader />
            )}

            {about ? (
              <div className="break-all text-xs">{about}</div>
            ) : (
              isFetching && <BoxLoader />
            )}
          </div>
        </div>
      </CardContainer>
    </>
  );
};

const ProfileCard = ({
  profileHex,
  providedMetadata,
  providedContacts,
}: {
  profileHex?: string | undefined;
  providedMetadata?: Event[] | undefined;
  providedContacts?: Event[] | undefined;
}) => {
  if (providedMetadata && providedContacts) {
    return (
      <ProfileView
        metadataEvents={providedMetadata}
        contactEvents={providedContacts}
        isFetching={false}
      />
    );
  }

  if (!profileHex) {
    return null;
  }

  const metadataFilters = [{ authors: [profileHex], kinds: [0] }];
  const contactFilters = [{ authors: [profileHex], kinds: [3] }];
  const { events: metadataEvents, eose } = useNostrSubscribe({
    filters: metadataFilters,
    relays,
    options: { batchingInterval: 100, enabled: !providedMetadata?.length },
  });
  const { events: contactEvents } = useNostrSubscribe({
    filters: contactFilters,
    relays,
    options: { batchingInterval: 100, enabled: !providedContacts?.length },
  });

  return (
    <ProfileView
      metadataEvents={providedMetadata || metadataEvents}
      contactEvents={providedContacts || contactEvents}
      isFetching={!eose && !metadataEvents.length && !providedMetadata?.length}
    />
  );
};

export default memo(ProfileCard);
