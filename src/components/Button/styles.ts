import styled, { css } from 'styled-components';
import { tint } from 'polished';
import type { ButtonProps } from '.';

export const ButtonStyles = styled.button<ButtonProps>`
  background: ${({ theme, variant }) => (variant === 'tertiary' ? theme.colors.tertiary : variant === 'secondary' ? theme.colors.secondary : theme.colors.primary)};
  height: 56px;
  border-radius: 10px;
  color: ${({ theme, variant }) => (variant === 'tertiary' ? theme.colors.primaryText : variant === 'secondary' ? theme.colors.white : theme.colors.primaryText)};
  width: 100%;
  transition: background-color 0.2s;

  ${({ theme, variant, outlined }) =>
    outlined &&
    css`
      border: 1px solid ${variant === 'tertiary' ? theme.colors.tertiary : variant === 'secondary' ? theme.colors.secondary : theme.colors.primary};
    `};

  &:hover {
    opacity: 0.9;

    ${({ theme, variant, outlined }) =>
      !outlined &&
      css`
          border: 1px solid ${variant === 'tertiary' ? theme.colors.primaryText : variant === 'secondary' ? theme.colors.white : theme.colors.primaryText};
    `};
  }

  &:disabled {
    background: ${props => tint(0.15, props.theme.colors.secondary)};
    cursor: not-allowed;
  }
`;
