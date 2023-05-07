import Embed from "./index";

const Image: Embed = {
  regex: /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))/gi,
  component: ({ match, index }) => (
    <div
      key={match + index}
      className="relative w-full overflow-hidden object-contain"
    >
      <img className="rounded max-h-[70vh] md:max-h-96 max-w-full" src={match} />
    </div>
  ),
}

export default Image;
