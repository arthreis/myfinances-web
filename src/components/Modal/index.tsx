import React, { useEffect } from 'react';

import {
  ModalBackground,
  ModalWrapper,
  ModalContent,
  ModalOverflow,
  ModalCloseButton,
  ModalSizeVariant,
} from './styles';

interface ModalProps {
  show: boolean;
  onClose: () => any;
  size?: ModalSizeVariant;
  height?: number;
  children: React.ReactNode;
}

function Modal({
  show,
  onClose,
  size,
  children,
  height,
}: ModalProps): React.JSX.Element {
  useEffect(() => {
    if (show) document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  return (
    <div>
      {show && (
        <ModalWrapper>
          <ModalContent size={size || 'md'} height={height}>
            <ModalOverflow>{children}</ModalOverflow>
            <ModalCloseButton onClick={() => onClose()}>
              &times;
            </ModalCloseButton>
          </ModalContent>
          <ModalBackground onClick={() => onClose()} />
        </ModalWrapper>
      )}
    </div>
  );
}

export default Modal;
