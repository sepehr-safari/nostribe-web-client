'use client';

import { nip19 } from 'nostr-tools';

import { IAuthor } from '@/types';

import { useProfileMetadata } from '@/hooks';

const useProfileContent = (profileAddress: string) => {
  const { isFetchingMetadata, isMetadataEmpty, metadataEose, metadataEvents } =
    useProfileMetadata(profileAddress);

  let profileObject;
  try {
    profileObject =
      metadataEvents.length && JSON.parse(metadataEvents[0].content || '{}');
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

  const npub = metadataEvents.length
    ? nip19.npubEncode(metadataEvents[0].pubkey)
    : '';

  return {
    ...author,
    npub,
    isFetchingMetadata,
    isMetadataEmpty,
    metadataEose,
    metadataEvents,
  };
};

export default useProfileContent;
