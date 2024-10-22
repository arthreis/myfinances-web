import styled, { css } from 'styled-components';
import type { TypographyProps } from '.';

export const CustomText = styled.span<TypographyProps>`
  ${({ theme, size, bold, color }) => css`
    font-size: ${size ? theme.fontSize.desktop[size] : theme.fontSize.desktop.MD};
    color: ${color ? theme.colors[color] : theme.colors.primaryText};
    font-weight: ${bold ? '700' : '100'};
  `}
`;
