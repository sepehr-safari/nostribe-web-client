'use client';

import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import Modal from '@/components/modal/Modal';
import ProxyImg from '@/components/ProxyImg';
import { mute, report } from '@/utils/user';
import Link from 'next/link';

import { useProfileContacts, useProfileContent, useProfileHex } from '@/hooks';

import Nip05View from '@/components/Nip05View';
import FollowButton from '@/components/FollowButton';

import { MouseEventHandler, useEffect, useState } from 'react';
import useStore from '@/store';
import { toHexKey } from '@/utils/hexKey';

const ProfileCard = ({ profileAddress }: { profileAddress: string }) => {
  const { about, banner, displayName, nip05, picture, website } =
    useProfileContent(profileAddress);

  const [showModal, setShowModal] = useState(false);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const userData = useStore((state) => state.auth.user.data);
  const { latestContactEvent } = useProfileContacts(profileAddress);
  const [followerCount, setFollowerCount] = useState(0);
  const hex = useProfileHex(profileAddress);
  const followsYou =
    userData?.publicKey &&
    !isMyProfile &&
    latestContactEvent?.tags?.some(
      (tag) => tag[0] === 'p' && tag[1] === toHexKey(userData?.publicKey || '')
    );

  useEffect(() => {
    setIsMyProfile(userData?.publicKey === hex);
    hex &&
      fetch(`https://eu.rbr.bio/${hex}/info.json`)
        .then((res) => {
          res.json().then((data) => {
            setFollowerCount(data.followerCount);
          });
        })
        .catch((err) => {
          console.log(err);
        });
  }, [hex]);

  const onClickAvatar: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  return (
    <>
      {showModal ? (
        <Modal onClose={() => setShowModal(false)}>
          <ProxyImg
            className="rounded max-h-[90vh] max-w-[90vw]"
            src={picture}
          />
        </Modal>
      ) : (
        ''
      )}
      {banner ? (
        <div className="h-48 w-full">
          <ProxyImg
            src={banner}
            className="h-full w-full object-cover opacity-80"
            alt={displayName}
          />
        </div>
      ) : (
        ''
      )}

      <div className="p-4">
        <div className={`flex items-center gap-4 flex-row`}>
          <div
            className={`self-start w-36 ${banner ? '-mt-16 md:-mt-20' : ''}`}
          >
            <div className="avatar">
              <div
                onClick={onClickAvatar}
                className={`cursor-pointer rounded-full border border-solid border-4 border-black w-18 md:w-36`}
              >
                <ProxyImg
                  square={true}
                  width={136}
                  src={picture || '/nostribe.png'}
                />
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3">
            <div className="flex flex-wrap">
              <div className="ml-auto flex gap-2">
                {isMyProfile ? (
                  <Link href="/profile/edit" className="btn btn-sm gap-2">
                    Edit profile
                  </Link>
                ) : (
                  <>
                    <Link
                      prefetch={false}
                      className="btn btn-sm"
                      href={`/messages/${profileAddress}`}
                    >
                      Message
                    </Link>
                    <FollowButton pub={profileAddress} />
                  </>
                )}

                <div className="dropdown-left dropdown">
                  <label
                    tabIndex={0}
                    className="btn-ghost btn-circle btn btn-sm text-neutral-500"
                  >
                    <EllipsisHorizontalIcon width={24} />
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu rounded-box w-32 bg-base-100 p-2 shadow-lg shadow-black"
                  >
                    <li>
                      <button
                        className="text-start text-xs"
                        onClick={() =>
                          navigator.clipboard.writeText(
                            `${location.origin}/${profileAddress}`
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
                          navigator.clipboard.writeText(profileAddress)
                        }
                      >
                        Copy User ID
                      </button>
                    </li>
                    <li>
                      <button
                        className="text-start text-xs"
                        onClick={() => report(hex)}
                      >
                        Report user
                      </button>
                    </li>
                    <li>
                      <button
                        className="text-start text-xs"
                        onClick={() => mute(hex)}
                      >
                        Mute user
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-2">
            {displayName && (
              <div className="text-xl font-bold">{displayName}</div>
            )}
            {nip05 && <Nip05View text={nip05} />}
            {website && (
              <a className="text-xs text-info" target="_blank" href={website}>
                {website
                  .replace('https://', '')
                  .replace('http://', '')
                  .replace(/\/$/, '')}
              </a>
            )}
          </div>
          {latestContactEvent && (
            <>
              <div className="flex flex-wrap gap-3 text-xs">
                <Link prefetch={false} href={`/following/${profileAddress}`}>
                  <b>{latestContactEvent.tags?.length || 0}</b>
                  {` `}Following
                </Link>
                <Link prefetch={false} href={`/followers/${profileAddress}`}>
                  <b>{followerCount}</b>
                  {` `}Followers
                </Link>
              </div>
              {followsYou && (
                <div className="text-xs text-neutral-500">Follows you</div>
              )}
            </>
          )}
          {about && <div className="break-all text-xs">{about}</div>}
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
