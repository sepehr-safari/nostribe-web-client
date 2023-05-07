export default {
  regex: /https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp)/i,
  component: ({ match }: {match:string}) => <img src={match} />,
}
