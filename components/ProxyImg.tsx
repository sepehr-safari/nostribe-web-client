import { MouseEventHandler, useEffect, useState } from 'react';

type Props = {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  square?: boolean;
  onError?: () => void;
  onClick?: MouseEventHandler;
  alt?: string;
};

const safeOrigins = [
  '/',
  'data:image',
  'https://imgur.com/',
  'https://i.imgur.com/',
  'https://imgproxy.iris.to/',
];

export const isSafeOrigin = (url: string) => {
  return safeOrigins.some((origin) => url.startsWith(origin));
};

const ProxyImg = (props: Props) => {
  const [proxyFailed, setProxyFailed] = useState(false);
  const [src, setSrc] = useState(() => {
    if (
      props.src &&
      (!isSafeOrigin(props.src) || props.width)
    ) {
      const originalSrc = props.src;
      if (props.width) {
        const width = props.width * 2;
        const resizeType = props.square ? 'fill' : 'fit';
        return `https://imgproxy.iris.to/insecure/rs:${resizeType}:${width}:${width}/plain/${originalSrc}`;
      } else {
        return `https://imgproxy.iris.to/insecure/plain/${originalSrc}`;
      }
    } else {
      return props.src;
    }
  });

  useEffect(() => {
    if (proxyFailed) {
      const originalSrc = props.src;
      const originalOnError = props.onError;
      if (proxyFailed) {
        console.log('original source failed too', originalSrc);
        setSrc(
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhQJ/qwQX2QAAAABJRU5ErkJggg==',
        );
        originalOnError && originalOnError();
      } else {
        console.log('image proxy failed', src, 'trying original source', originalSrc);
        setSrc(originalSrc + '?retry=' + new Date().getTime());
      }
    }
  }, [proxyFailed, props.src]);

  return (
    <img
      src={src}
      onError={() => setProxyFailed(true)}
      onClick={props.onClick}
      className={props.className}
      style={props.style}
      width={props.width}
      height={props.width}
      alt={props.alt}
    />
  );
};

export default ProxyImg;
