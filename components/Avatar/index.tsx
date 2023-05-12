'use client';

import {useProfileContent} from "@/hooks";
import ProxyImg from "@/components/ProxyImg";

type Width = 'w-6' | 'w-8' | 'w-12' | 'w-14' | 'w-24' | 'w-36';

export function BaseAvatar({
  url,
  width = 'w-12',
}: {
  url: string;
  width?: Width;
}) {
  return (
    <>
      <div className="avatar">
        <div className={`mask mask-circle ${width}`}>
          <ProxyImg square={true} width={96} src={url || '/nostribe.png'} />
        </div>
      </div>
    </>
  );
}

export default function Avatar({
  pub,
  width = 'w-12',
}: {
  pub: string;
  width?: Width;
}) {
  let { picture } = useProfileContent(pub);

  if (picture?.startsWith('http')) {
    picture = `https://imgproxy.iris.to/insecure/rs:fill:96:96/plain/${picture}`;
  }
  return <BaseAvatar url={picture} width={width} />;
}