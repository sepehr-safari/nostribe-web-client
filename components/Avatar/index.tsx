'use client';

import ProxyImg from '@/components/ProxyImg';

export default function Avatar({
  url,
  width = 'w-12',
}: {
  url: string;
  width?: 'w-6' | 'w-8' | 'w-12' | 'w-14' | 'w-24' | 'w-36';
}) {
  return (
    <>
      <div className="avatar">
        <div className={`mask mask-circle ${width}`}>
          <ProxyImg square={true} width={144} src={url} />
        </div>
      </div>
    </>
  );
}
