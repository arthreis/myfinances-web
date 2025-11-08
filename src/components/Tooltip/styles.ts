import styled from 'styled-components';
import type { TooltipType } from '.';

export const Container = styled.div<TooltipType>`
  position: relative;

  span {
    width: 160px;
    background: ${({ theme, variant }) =>
      variant === 'danger'
        ? theme.colors.danger
        : variant === 'success'
          ? theme.colors.success
          : variant === 'secondary'
            ? theme.colors.secondary
            : theme.colors.primary};

    color: ${({ theme, variant }) =>
      variant === 'danger'
        ? theme.colors.primaryText
        : variant === 'success'
          ? theme.colors.primaryText
          : variant === 'secondary'
            ? theme.colors.white
            : theme.colors.primaryText};
    padding: 8px;
    border-radius: 4px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    left: 50%;
    text-align: center;
    transform: translateX(-50%);
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 12px);

    font-size: ${({ theme }) => theme.fontSize.desktop.SM};
    @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
      font-size: ${({ theme }) => theme.fontSize.tablet.SM};
    }
    @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
      font-size: ${({ theme }) => theme.fontSize.mobile.SM};
    }

    &::before {
      content: '';
      border-style: solid;
      border-color: ${({ theme, variant }) =>
        variant === 'danger'
          ? theme.colors.danger
          : variant === 'success'
            ? theme.colors.success
            : variant === 'secondary'
              ? theme.colors.secondary
              : theme.colors.primary} transparent;
      border-width: 6px 6px 0 6px;
      left: 50%;
      transform: translateX(-50%);
      top: 100%;
      position: absolute;
    }
  }

svg {
    transition: color 0.2s;
    &:hover {
      cursor: pointer;
      color: ${({ theme, variant }) =>
        variant === 'danger'
          ? theme.colors.danger
          : variant === 'success'
            ? theme.colors.success
            : variant === 'secondary'
              ? theme.colors.secondary
              : theme.colors.primary};
    }
  }

  &:hover {
    span {
      opacity: 1;
      visibility: visible;
    }
  }
`;
