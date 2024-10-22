import styled from 'styled-components';
import { rgba, shade } from 'polished';

export const ModalWrapper = styled.div`
  bottom: 0;
  display: flex;
  flex-flow: column nowrap;
  left: 0;
  position: fixed;
  top: 0;
  z-index: 1050;
`;

export const Body = styled.div``;

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

export const Title = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  h1 {
    font-weight: 500;
    color: ${props => props.theme.colors.primaryText};

    font-size: ${({ theme }) => theme.fontSize.desktop.LG};
    @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
      font-size: ${({ theme }) => theme.fontSize.tablet.LG};
    }
    @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
      font-size: ${({ theme }) => theme.fontSize.mobile.LG};
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 16px;
`;

export const ModalContent = styled.div<ModalContentProps>`
  flex-direction: column;
  padding: 16px 32px;
  background: ${props => shade(0.1, props.theme.colors.background)};
  color: ${props => props.theme.colors.primaryText};
  display: flex;
  left: 0;
  margin: 50px auto;
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
  overflow-y: auto;
`;

export const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${props => rgba(props.theme.colors.overlay, 0.9)};
`;

export const ModalCloseButton = styled.span`
  position: absolute;
  right: 0;
  padding: 32px;

  color: ${props => props.theme.colors.primaryText};
  cursor: pointer;

  font-size: ${({ theme }) => theme.fontSize.desktop.XL};
  @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
    font-size: $${({ theme }) => theme.fontSize.tablet.XL};
    top: 0;
  }
  @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.mobile.XL};
  }
`;
