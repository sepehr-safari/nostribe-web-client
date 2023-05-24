'use client';

import { nip19 } from 'nostr-tools';

import { IAuthor } from '@/types';

import { useProfileHex, useProfileMetadata } from '@/hooks';

const useProfileContent = (profileAddress: string) => {
  const hex = useProfileHex(profileAddress);
  const {
    isFetchingMetadata,
    isMetadataEmpty,
    metadataEose,
    latestMetadataEvent,
  } = useProfileMetadata(hex);

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

  const npub = (profileAddress && nip19.npubEncode(hex)) || undefined;

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
