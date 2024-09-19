import styled from 'styled-components';
import { rgba } from 'polished';
import * as Constants from '../../constants';

export const ModalWrapper = styled.div`
  bottom: 0;
  display: flex;
  flex-flow: column nowrap;
  left: 0;
  position: fixed;
  top: 0;
  z-index: 1050;
`;

export const ModalOverflow = styled.div`
  width: 100%;
`;

export type ModalSizeVariant = 'sm' | 'md' | 'lg';

interface ModalContentProps {
  size?: ModalSizeVariant;
  height?: number;
}

const sizes: { [key in ModalSizeVariant]: string } = {
  sm: '600',
  md: '700',
  lg: '800',
};

export const ModalContent = styled.div<ModalContentProps>`
  background: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.primaryText};
  display: flex;
  /* height: 100%; */
  left: 0;
  margin: 50px auto;
  /* max-height: ${props => (props.height ? `${props.height}px` : '80%')}; */
  position: absolute;
  right: 0;
  width: ${({ size }) => {
    return size ? `${sizes[size]}px` : '100%';
  }};
  @media (max-width: calc(${p => p.theme.layout.breakpoints.tablet} - 1px)) {
    width: 100%;
    margin: 0;
  }
  z-index: 1;

  /* height: 100vh; */
  overflow-y: auto;
`;

export const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${props => rgba(props.theme.colors.overlay, 0.88)};
`;

export const ModalCloseButton = styled.span`
  color: ${props => props.theme.colors.defaultText};
  cursor: pointer;
  padding: 10px;
  position: absolute;
  right: 0;
  /* top: -50px; */

  font-size: ${Constants.FONT_SIZE.desktop.xlarge};
  @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
    font-size: ${Constants.FONT_SIZE.tablet.xlarge};
    top: 0;
  }
  @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
    font-size: ${Constants.FONT_SIZE.mobile.xlarge};
  }
`;
