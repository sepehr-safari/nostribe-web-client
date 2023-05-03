'use client';

export default function Avatar({
  url,
  width = 'w-12',
}: {
  url: string;
  width?: 'w-6' | 'w-8' | 'w-12' | 'w-14' | 'w-24' | 'w-36';
}) {
  if (url?.startsWith('http')) {
    url = `https://imgproxy.iris.to/insecure/rs:fill:288:288/plain/${url}`;
  }
  return (
    <>
      <div className="avatar">
        <div className={`mask mask-circle ${width}`}>
          <img src={url} />
        </div>
      </div>
    </>
  );
}
