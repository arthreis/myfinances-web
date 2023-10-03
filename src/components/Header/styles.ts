import styled, { css } from 'styled-components';
import { tint } from 'polished';
import * as Constants from '../../constants';

interface ContainerProps {
  size?: 'small' | 'large';
  open: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: ${props => props.theme.colors.primary};
  padding: 30px 0;

  /* @media (max-width: ${({ theme }) => theme.layout.breakpoints.mobile}) { */
  @media (max-width: calc(${({ theme }) =>
      theme.layout.breakpoints.tablet} - 1px)) {
    /* width: 100%; */
    /* transform: ${({ open }) =>
      open ? 'translateX(0)' : 'translateX(-100%)'}; */
    display: ${({ open }) => (open ? 'block' : 'none')};
    height: ${({ open }) => (open ? '100vh' : '30vh')};
    /* background-color: ${({ theme }) => theme.colors.primary}; */
    /* width: ${({ open }) => (!open ? '100vw' : '0vw')}; */
    /* overflow-x: hidden; */
    padding: 0 20px;
  }

  header {
    /* width: 1120px; */
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 80px')};
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: ${({ theme }) => theme.layout.breakpoints.mobile}) {
      /* display: flex; */
      flex-direction: column;
      /* padding: 0 20px; */

      > a {
        display: none;
      }
    }

    > div {
      @media (max-width: ${({ theme }) => theme.layout.breakpoints.mobile}) {
        /* display: flex; */
        flex-direction: column;
      }
      display: flex;
      align-items: center;
      /* padding: 0 20px; */
      /* padding-right: 20px; */
      /* padding-left: 20px; */

      nav {
        @media (max-width: ${({ theme }) => theme.layout.breakpoints.mobile}) {
          display: flex;
          flex-direction: column;
          align-items: center;

          width: 100vw;
          padding: 20px 20px;
          /* padding: 20px 0px; */
        }
        a {
          color: ${props => props.theme.colors.secondaryText};
          text-decoration: none;
          transition: opacity 0.2s;
          padding-bottom: 10px;

          font-size: ${Constants.FONT_SIZE.desktop.normal};
          @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
            font-size: ${Constants.FONT_SIZE.tablet.normal};
          }
          @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
            font-size: ${Constants.FONT_SIZE.mobile.xlarge};
            width: 100%;
          }

          & + a {
            /* margin-left: 32px; */
            @media (min-width: calc(${({ theme }) =>
                theme.layout.breakpoints.mobile} + 1px)) {
              margin-left: 32px;
            }
          }

          &.active-link {
            border-bottom: 2px solid ${props => props.theme.colors.secondary};
          }

          &:hover {
            opacity: 0.6;
          }
        }
      }

      > div {
        @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
          display: none !important;
          /* background-color: ${({ open }) => (open ? 'red' : 'green')}; */
          /* padding: 20px; */
        }
      }

      .theme-switcher {
        @media (min-width: calc(${({ theme }) =>
            theme.layout.breakpoints.mobile} + 1px)) {
          margin-left: 20px;
        }
      }

      > a {
        /* Botão sair */
        background: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.secondaryText};
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        padding: 5px;
        width: 80px;
        text-decoration: none;
        margin-left: 30px;
        transition: background 0.2s;

        @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
          /* margin-left: 0px;
          width: 90%; */

          margin-left: 0px;
          width: 90%;
          /* margin-left: 20px; */
          /* margin-right: 20px; */
        }

        svg {
          margin-right: 10px;
        }

        &:hover {
          background: ${props => tint(0.15, props.theme.colors.secondary)};
        }
      }
    }
  }
`;

interface IconSwitcherContainerProps {
  align?: string;
}

export const IconSwitcherContainer = styled.div<IconSwitcherContainerProps>`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 5px;

  ${({ align }) =>
    align &&
    css`
      justify-content: ${align};
    `}
`;
