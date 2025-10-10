import styled, { css, type ThemeProps } from 'styled-components';
import type Theme from '@/styles/themes/theme';

interface CardProps extends ThemeProps<Theme> {
  total?: boolean;
}

export const Container = styled.div`
  max-width: ${p => p.theme.layout.maxContainer};
  margin: 0 auto;
  padding: 40px 20px;
  @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
    padding: 20px 20px;
  }
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.desktop.XL};
  @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.tablet.XL};
  }
  @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.mobile.XL};
  }
  color: ${props => props.theme.colors.primaryText};
`;

export const CardContainer = styled.section`
  @media (min-width: ${p => p.theme.layout.breakpoints.tablet}) {
    margin-bottom: 20px;
  }
  @media (max-width: calc(${p => p.theme.layout.breakpoints.tablet} - 1px)) {
    margin-top: 0px;
    flex-direction: column;
    row-gap: 16px;
  }
  display: flex;
  justify-content: space-between;
`;

export const Card = styled.div`
  background: ${({ theme }: CardProps) => theme.colors.tertiary};
  padding: 8px 16px;
  border-radius: 5px;
  color: ${({ theme }: CardProps): string => theme.colors.primaryText};
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
    padding: 12px 22px;
  }

  @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
    flex-direction: column;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      margin-left: 4px;
      font-size: ${({ theme }) => theme.fontSize.desktop.LG};
      @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
        font-size: ${({ theme }) => theme.fontSize.tablet.LG};
      }
      @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSize.mobile.LG};
      }
    }
  }

  transition: transform 0.2s ease-in;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const TitleAndViewSelector = styled.section`
  margin-bottom: 20px;

  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
    margin-top: 24px;
  }
  h1 {
    margin-right: auto;

    font-weight: 500;
    line-height: calc(${({ theme }) => theme.fontSize.desktop.XL} * 1.5);
    color: ${props => props.theme.colors.primaryText};
    font-size: ${({ theme }) => theme.fontSize.desktop.XL};
    @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
      margin-right: auto;
      font-size: ${({ theme }) => theme.fontSize.tablet.XL};
      line-height: calc(${({ theme }) => theme.fontSize.tablet.XL} * 1.5);
    }
    @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
      line-height: calc(${({ theme }) => theme.fontSize.mobile.XL} * 1.5);
      font-size: ${({ theme }) => theme.fontSize.mobile.XL};
    }
  }

  > div {
    display: flex;
    height: 100%;

    svg {
      padding-bottom: 5px;
      border-bottom: 2px solid transparent;
      color: ${props => props.theme.colors.primaryText};

      & + svg {
        margin-left: 5px;
      }

      transition: border-bottom 0.2s ease;

      &:hover,
      &.active {
        border-color: ${props => props.theme.colors.secondary};
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
`;

export const Balance = styled.span<{ isPositive?: boolean }>`

  ${({ theme, isPositive }) => isPositive !== undefined &&
    css`
      color: ${(isPositive ? theme.colors.success : theme.colors.danger)};
  `};

  font-size: ${({ theme }) => theme.fontSize.desktop.LG};
  font-weight: normal;
  @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.tablet.LG};
    font-weight: normal;
  }
  @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.mobile.LG};
    font-weight: normal;
  }
`
