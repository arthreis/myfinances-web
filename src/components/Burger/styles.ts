import styled from 'styled-components';

interface MenuProps {
  open: boolean;
}

export const Container = styled.div<MenuProps>`
  /* position: absolute; */
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 40px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: green; */
  a {
    /* margin-left: 25vw; */
    /* position: absolute; */
  }
  @media (min-width: calc(${({ theme }) => theme.layout.breakpoints.tablet})) {
    display: none;
  }

  .theme-switcher {
    display: ${({ open }) => (open ? 'block' : 'none !important')};
    /* margin-top: -24px; */
    /* position: absolute; */
  }
`;

export const Burger = styled.button<MenuProps>`
  /* position: absolute; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  span {
    width: 2rem;
    height: 0.25rem;
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? '0' : '1')};
      transform: ${({ open }) => (open ? 'translateX(20px)' : 'translateX(0)')};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;
