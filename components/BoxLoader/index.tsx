import ContentLoader from 'react-content-loader';

const BoxLoader = () => (
  <ContentLoader
    speed={3}
    width={120}
    height={20}
    viewBox="0 0 120 10"
    backgroundColor="#150B1D"
    foregroundColor="#603285"
  >
    <rect x="0" y="0" rx="3" ry="3" width="120" height="10" />
  </ContentLoader>
);

export default BoxLoader;
