import { useProfileContent, useProfilePosts } from '@/hooks';
import { useEffect } from 'react';

const useProfilePage = (profileAddress: string) => {
  const { displayName, isFetchingMetadata, isMetadataEmpty } =
    useProfileContent(profileAddress);

  const { postEvents } = useProfilePosts(profileAddress);

  useEffect(() => {
    document.title = displayName ? `${displayName} | Nostribe` : 'Nostribe';

    return () => {
      document.title = 'Nostribe';
    };
  }, [displayName]);

  return {
    isMetadataEmpty,
    isFetchingMetadata,
    postEvents,
  };
};

export default useProfilePage;
