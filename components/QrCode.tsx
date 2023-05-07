import QRCodeStyling from 'qr-code-styling';
import {useRef, useEffect} from "react";

export default function Qr(props: { data: string }) {
  const ref = useRef<HTMLDivElement>(null);
  //const [qr, setQr] = useState(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      type: "svg",
      data: props.data,
      image: "/img/icon128.png",
      dotsOptions: {
          color: "#4267b2",
          type: "rounded"
      },
      backgroundOptions: {
          color: "#e9ebee",
      },
      imageOptions: {
          crossOrigin: "anonymous",
          margin: 20
      }
    });
    qrCode.append(ref.current);
  }, [props.data]);

  return <div className="border-4 border-white inline-block" ref={ref} />;
}
