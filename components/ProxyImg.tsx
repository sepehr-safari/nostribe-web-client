'use client';

import {MouseEventHandler, useState} from 'react';

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

// need to have trailing slash, otherwise you could do https://imgur.com.myevilwebsite.com/image.png
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
  let onError = props.onError;
  let mySrc = props.src;
  const [proxyFailed, setProxyFailed] = useState(false);
  const [src, setSrc] = useState(mySrc);
  if (
    props.src &&
    (!isSafeOrigin(props.src) || props.width)
  ) {
    // free proxy with a 250 images per 10 min limit? https://images.weserv.nl/docs/
    const originalSrc = props.src;
    if (props.width) {
      const width = props.width * 2;
      const resizeType = props.square ? 'fill' : 'fit';
      mySrc = `https://imgproxy.iris.to/insecure/rs:${resizeType}:${width}:${width}/plain/${originalSrc}`;
    } else {
      mySrc = `https://imgproxy.iris.to/insecure/plain/${originalSrc}`;
    }
    const originalOnError = props.onError;
    // try without proxy if it fails
    onError = () => {
      if (proxyFailed) {
        console.log('original source failed too', originalSrc);
        // set base64 empty placeholder
        setSrc(
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhQJ/qwQX2QAAAABJRU5ErkJggg==',
        );
        originalOnError && originalOnError();
      } else {
        console.log('image proxy failed', mySrc, 'trying original source', originalSrc);
        setProxyFailed(true);
        setSrc(originalSrc);
      }
    };
  }

  return (
    <img
      src={src}
      onError={onError}
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
