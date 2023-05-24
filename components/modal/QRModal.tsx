import Name from '../Name';
import QrCode from '../QrCode';
import { nip19 } from 'nostr-tools';

import Modal from './Modal';

const QRModal = (props: { pub: string; onClose?: () => {} }) => {
  const npub = props.pub.startsWith('npub')
    ? props.pub
    : nip19.npubEncode(props.pub);
  const link = `https://iris.to/${npub}`;
  return (
    <Modal centerVertically={true} showContainer={true} onClose={props.onClose}>
      <div style={{ textAlign: 'center', flex: 1 }}>
        <QrCode data={link} />
        <p>
          <Name pub={props.pub} />
        </p>
      </div>
    </Modal>
  );
};

export default QRModal;
