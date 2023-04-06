import ContentLoader from 'react-content-loader';

const AvatarLoader = () => (
  <ContentLoader
    speed={2}
    width={56}
    height={56}
    viewBox="0 0 56 56"
    backgroundColor="#150B1D"
    foregroundColor="#603285"
  >
    <circle cx="28" cy="28" r="28" />
  </ContentLoader>
);

export default AvatarLoader;
