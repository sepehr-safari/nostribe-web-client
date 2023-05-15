import Link from "next/link";
import Avatar from "@/components/Avatar";
import Name from "@/components/Name";
import FollowButton from "@/components/FollowButton";

const SUGGESTED_FOLLOWS = [
  [
    'npub1sn0wdenkukak0d9dfczzeacvhkrgz92ak56egt7vdgzn8pv2wfqqhrjdv9',
    '"I used to work for the government. Now I work for the public."',
  ], // snowden
  ['npub1sg6plzptd64u62a878hep2kev88swjh3tw00gjsfl8f237lmu63q0uf63m', 'Former CEO of Twitter'], // jack
  [
    'npub1a2cww4kn9wqte4ry70vyfwqyqvpswksna27rtxd8vty6c74era8sdcw83a',
    '"Fundamental investing with a global macro overlay"',
  ], // Lyn Alden
  [
    'npub15dqlghlewk84wz3pkqqvzl2w2w36f97g89ljds8x6c094nlu02vqjllm5m',
    'MicroStrategy Founder & Chairman',
  ], // saylor
  ['npub1g53mukxnjkcmr94fhryzkqutdz2ukq4ks0gvy5af25rgmwsl4ngq43drvk', 'iris.to developer'], // sirius
  ['npub1z4m7gkva6yxgvdyclc7zp0vz4ta0s2d9jh8g83w03tp5vdf3kzdsxana6p', 'Digital artist'], // yegorpetrov
  [
    'npub1az9xj85cmxv8e9j9y80lvqp97crsqdu2fpu3srwthd99qfu9qsgstam8y8',
    'Bitcoin hardware entrepreneur and podcaster',
  ], // nvk
  [
    'npub180cvv07tjdrrgpa0j7j7tmnyl2yr6yr7l8j4s3evf6u64th6gkwsyjh6w6',
    'Original developer of Nostr',
  ], // fiatjaf
  [
    'npub1hu3hdctm5nkzd8gslnyedfr5ddz3z547jqcl5j88g4fame2jd08qh6h8nh',
    '"Lover of memes, maker of videos"',
  ], // carla
];

export default function FollowSuggestions() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <p>Follow someone to get started! Suggestions:</p>
      {SUGGESTED_FOLLOWS.map(([npub, bio]) => (
        <div key={npub} className="flex flex-row justify-between">
          <Link href={`/${npub}`} key={npub} className="flex items-center gap-4">
            <Avatar pub={npub} width="w-12" />
            <div className="flex flex-col">
              <Name pub={npub} />
              <div className="text-xs opacity-50">{bio}</div>
            </div>
          </Link>
          <FollowButton pub={npub} />
        </div>
      ))}
    </div>
  );
}