import ProxyImg from '../ProxyImg';

import Modal from './Modal';

const ImageModal = (props: { images: string[]; onClose?: () => {} }) => {
  return (
    <Modal
      centerVertically={props.images?.length === 1}
      onClose={props.onClose}
    >
      <div className="flex flex-col gap-4">
        {props.images.map((img: string, i: number) => {
          return (
            <p key={img + i}>
              <ProxyImg
                style={{ maxHeight: '90vh', maxWidth: '90vw' }}
                src={img}
              />
            </p>
          );
        })}
      </div>
    </Modal>
  );
};

export default ImageModal;
