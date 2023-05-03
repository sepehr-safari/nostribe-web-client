import React, {FC, useEffect} from 'react';

type Props = {
  onClose?: () => void;
  justifyContent?: string;
  showContainer?: boolean;
  centerVertically?: boolean;
  width?: string;
  height?: string;
  children: React.ReactNode;
};

const Modal: FC<Props> = ({
  showContainer,
  children,
  onClose,
}) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose?.();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const content = showContainer ? (
    <div
      className="msg"
    >
      <div className="msg-content" style={{ padding: '30px' }}>
        {children}
      </div>
    </div>
  ) : (
    children
  );

  return (
    <div className="modal">
      <div className="modal-box">
        {content}
      </div>
    </div>
  );
};

export default Modal;
