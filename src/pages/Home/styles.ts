import styled, { ThemeProps } from 'styled-components';
import Theme from '../../styles/themes/theme';
import * as Constants from '../../constants';

interface CardProps extends ThemeProps<Theme> {
  total?: boolean;
}

export const Container = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  font-size: ${Constants.FONT_SIZE.desktop.xxxlarge};
  @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
    font-size: ${Constants.FONT_SIZE.tablet.xxxlarge};
  }
  @media (max-width: 480px) {
    font-size: ${Constants.FONT_SIZE.mobile.xxxlarge};
  }
  color: ${props => props.theme.colors.primaryText};
`;

export const CardContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 28px;
  margin-top: -150px;
  @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
    /* margin-top: -120px; */
  }
`;

export const Card = styled.div`
  background: ${({ total, theme }: CardProps): string =>
    total ? theme.colors.secondary : theme.colors.default};
  padding: 22px 32px;
  border-radius: 5px;
  color: ${({ total, theme }: CardProps): string =>
    total ? theme.colors.secondaryText : theme.colors.primaryText};
  width: 100%;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: ${Constants.FONT_SIZE.desktop.xxlarge};
      @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
        font-size: ${Constants.FONT_SIZE.tablet.xxlarge};
      }
      @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
        font-size: ${Constants.FONT_SIZE.mobile.xxlarge};
      }
    }
  }

  h1 {
    margin-top: 14px;
    font-size: ${Constants.FONT_SIZE.desktop.xxlarge};
    font-weight: normal;
    line-height: 54px;
    @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
      margin-top: 8px;
      font-size: ${Constants.FONT_SIZE.tablet.xxlarge};
      font-weight: normal;
      line-height: 44px;
    }
    @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
      margin-top: 8px;
      font-size: ${Constants.FONT_SIZE.mobile.xxlarge};
      font-weight: normal;
      line-height: 54px;
    }
  }

  transition: transform 0.2s ease-in;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const TitleAndViewSelector = styled.section`
  margin-top: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-weight: 500;
    line-height: 54px;
    color: ${props => props.theme.colors.primaryText};
    font-size: ${Constants.FONT_SIZE.desktop.xxlarge};
    @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
      font-size: ${Constants.FONT_SIZE.tablet.xxlarge};
    }
    @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
      font-size: ${Constants.FONT_SIZE.mobile.xxlarge};
    }
  }

  > div {
    display: flex;
    height: 100%;

    svg {
      padding-bottom: 5px;
      border-bottom: 2px solid transparent;
      color: ${props => props.theme.colors.defaultText};

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
