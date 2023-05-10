import {FC, MouseEventHandler, ReactNode, useEffect} from 'react';
import 'daisyui';

type Props = {
  onClose?: () => void;
  justifyContent?: string;
  showContainer?: boolean;
  centerVertically?: boolean;
  width?: string;
  height?: string;
  children?: ReactNode;
};

const Modal: FC<Props> = ({
  width,
  height,
  showContainer,
  children,
  onClose,
}) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose?.();
    }
  };

  const handleOverlayClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    onClose?.();
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const content = showContainer ? (
    <div
      className="msg w-full max-w-lg mx-auto"
      onClick={(e) => handleContainerClick(e)}
    >
      <div className="msg-content" tw="p-8">
        {children}
      </div>
    </div>
  ) : (
    children
  );

  return (
    <div
      className="fixed top-0 left-0 z-40 w-full h-full bg-black bg-opacity-80 flex items-center justify-center overflow-y-auto overflow-x-hidden p-5"
      onClick={handleOverlayClick}
    >
      <div
        className="flex flex-col items-center w-full h-full"
      >
        {content}
      </div>
    </div>
  );
};

export default Modal;
