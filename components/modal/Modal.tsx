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
      className="bg-black rounded-lg shadow-lg p-5 border border-gray-700 w-full md:w-1/2"
      onClick={(e) => handleContainerClick(e)}
    >
      {children}
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
        className="flex flex-col items-center w-full"
      >
        {content}
      </div>
    </div>
  );
};

export default Modal;
