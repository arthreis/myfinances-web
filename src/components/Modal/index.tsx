import React, { useEffect } from 'react';

import {
  ModalBackground,
  ModalWrapper,
  ModalContent,
  ModalCloseButton,
  ModalSizeVariant,
  Header,
  Title,
  Body,
} from './styles';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  size?: ModalSizeVariant;
  height?: number;
  children: React.ReactNode;
  title?: string;
}

function Modal({
  show,
  onClose,
  size,
  children,
  height,
  title,
}: ModalProps): React.JSX.Element {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  return (
    <>
      {show && (
        <ModalWrapper>
          <ModalContent size={size ?? 'md'} height={height}>
            <Header>
              <Title>
                <h1>{title}</h1>
              </Title>
              <ModalCloseButton onClick={() => onClose()}>
                &times;
              </ModalCloseButton>
            </Header>

            <Body>{children}</Body>

          </ModalContent>
          <ModalBackground onClick={() => onClose()} />
        </ModalWrapper>
      )}
    </>
  );
}

export default Modal;
