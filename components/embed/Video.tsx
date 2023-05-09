import Embed from "./index";

const Video: Embed = {
  regex: /(https?:\/\/.*\.(?:mp4|webm|ogg|mov)(?:\?\S*)?)/gi,
  component: ({ match, index }) => (
    <div
      key={match + index}
      className="relative w-full overflow-hidden object-contain"
    >
      <video className="rounded max-h-[70vh] md:max-h-96 max-w-full" src={match} controls muted autoPlay></video>
    </div>
  ),
}

export default Video;