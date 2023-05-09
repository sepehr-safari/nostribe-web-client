'use client';

import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import Modal from '@/components/modal/Modal';
import Link from 'next/link';

import { useProfileContacts, useProfileContent, useProfileHex } from '@/hooks';

import AvatarLoader from "@/components/Avatar/AvatarLoader";
import BoxLoader from "@/components/BoxLoader";
import CardContainer from "@/components/CardContainer";
import Nip05View from "@/components/Nip05View";
import FollowButton from "@/components/FollowButton";

import {MouseEventHandler, useEffect, useState} from "react";
import useStore from "@/store";
import {toHexKey} from "@/utils/hexKey";

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

  const [showModal, setShowModal] = useState(false);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const userData = useStore((state) => state.auth.user.data);
  const { latestContactEvent } = useProfileContacts(profileAddress);
  const [followerCount, setFollowerCount] = useState(0);
  const hex = useProfileHex(profileAddress);
  const followsYou = userData?.publicKey && !isMyProfile &&
    latestContactEvent?.tags?.some(
      (tag) => tag[0] === 'p' && tag[1] === toHexKey(userData?.publicKey || '')
    );

  useEffect(() => {
    setIsMyProfile(userData?.publicKey === hex);
    hex && fetch(`https://eu.rbr.bio/${hex}/info.json`).then((res) => {
      res.json().then((data) => {
        setFollowerCount(data.followerCount);
      });
    }).catch((err) => {
      console.log(err);
    });
  }, [hex]);

  const proxiedBanner = banner && `https://imgproxy.iris.to/insecure/plain/${banner}`;
  const onClickAvatar: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    setShowModal(true);
  }

  return (
    <>
      {showModal ? (
        <Modal onClose={() => setShowModal(false)}>
          <img className="rounded max-h-[90vh] max-w-[90vw]" src={
            `https://imgproxy.iris.to/insecure/plain/${picture}`
          } />
        </Modal>
      ) : ''}
      <CardContainer>
        <div className="absolute top-0 left-0 h-48 w-full">
          <img
            src={proxiedBanner || '/nostribe.png'}
            className="h-full w-full object-cover opacity-80"
            alt={displayName}
          />
        </div>

        <div className="flex flex-col items-center gap-4 pt-36 md:flex-row">
          <div className="md:self-start w-36">
            {isFetchingMetadata ? (
              <AvatarLoader />
            ) : (
              <div className="avatar">
                <div onClick={onClickAvatar} className={`cursor-pointer rounded-full border border-solid border-4 border-black w-36`}>
                  <img src={ picture && `https://imgproxy.iris.to/insecure/rs:fill:272:272/plain/${picture}` || '/nostribe.png'} />
                </div>
              </div>
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
                  <a className="text-xs text-info" target="_blank" href={website}>
                    {website
                      .replace('https://', '')
                      .replace('http://', '')
                      .replace(/\/$/, '')
                    }
                  </a>
                ) : (
                  isFetchingMetadata && <BoxLoader />
                )}
              </div>

              <div className="ml-auto flex gap-2">
                {isMyProfile ? (
                  <button className="btn btn-sm gap-2">
                    Edit profile
                  </button>
                ) : <FollowButton pub={profileAddress} />}

                <div className="dropdown-left dropdown">
                <label tabIndex={0} className="btn-ghost btn-circle btn btn-sm text-gray-500">
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
                          `${location.origin}/profile/${profileAddress}`
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
                        navigator.clipboard.writeText(
                          `${location.origin}/profile/${profileAddress}`
                        )
                      }
                    >
                      Copy User ID
                    </button>
                  </li>
                </ul>
              </div>

              </div>
            </div>

            {latestContactEvent ? (
              <>
                <div className="flex flex-wrap gap-3 text-xs">
                  <Link href={`/following/${profileAddress}`}>
                    <b>
                      {latestContactEvent.tags?.length || 0}
                    </b>
                    {` `}Following
                  </Link>
                  <Link href={`/followers/${profileAddress}`}>
                    <b>{followerCount}</b>
                    {` `}Followers
                  </Link>
                </div>
                {followsYou && (
                  <div className="text-xs text-gray-500">
                    Follows you
                  </div>
                )}
              </>
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
