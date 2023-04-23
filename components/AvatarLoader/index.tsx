import ContentLoader from 'react-content-loader';

const AvatarLoader = () => (
  <ContentLoader
    speed={1.5}
    width={100}
    height={100}
    viewBox="0 0 100 100"
    backgroundColor="#0e0614"
    foregroundColor="#603285"
    className="w-full"
  >
    <circle cx="50" cy="50" r="50" />
  </ContentLoader>
);

export default AvatarLoader;
