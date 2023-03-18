export default function Avatar({
  url,
  width = 'w-12',
}: {
  url: string;
  width?: 'w-6' | 'w-12' | 'w-24' | 'w-36';
}) {
  return (
    <>
      <div className="avatar">
        <div className={`mask mask-squircle ${width}`}>
          <img src={url} />
        </div>
      </div>
    </>
  );
}
