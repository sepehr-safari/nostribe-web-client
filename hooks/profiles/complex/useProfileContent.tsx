'use client';

import { nip19 } from 'nostr-tools';

import { IAuthor } from '@/types';

import { useProfileMetadata } from '@/hooks';

const useProfileContent = (profileAddress: string) => {
  const { isFetchingMetadata, isMetadataEmpty, metadataEose, latestMetadataEvent } =
    useProfileMetadata(profileAddress);

  let profileObject;
  try {
    profileObject = JSON.parse(latestMetadataEvent?.content || '{}');
  } catch (error) {
    profileObject = {};
    console.log(error);
  }

  const author: IAuthor = {
    about: profileObject.about || '',
    banner: profileObject.banner || '',
    following: profileObject.following || [],
    id: profileObject.id || '',
    lud06: profileObject.lud06 || '',
    name: profileObject.name || '',
    nip05: profileObject.nip05 || '',
    picture: profileObject.picture || '',
    website: profileObject.website || '',
    displayName: profileObject.display_name || profileObject.name,
  };

  const npub = latestMetadataEvent
    ? nip19.npubEncode(latestMetadataEvent.pubkey)
    : '';

  return {
    ...author,
    npub,
    isFetchingMetadata,
    isMetadataEmpty,
    metadataEose,
    latestMetadataEvent,
  };
};

export default useProfileContent;
