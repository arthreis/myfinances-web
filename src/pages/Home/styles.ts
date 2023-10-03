import styled, { ThemeProps } from 'styled-components';
import Theme from '../../styles/themes/theme';
import * as Constants from '../../constants';

interface CardProps extends ThemeProps<Theme> {
  total?: boolean;
}

export const Container = styled.div`
  /* width: 100%; */
  max-width: ${p => p.theme.layout.maxContainer};
  margin: 0 auto;
  padding: 40px 20px;
  @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
    padding: 20px 20px;
  }
`;

export const Title = styled.h1`
  font-size: ${Constants.FONT_SIZE.desktop.xxxlarge};
  @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
    font-size: ${Constants.FONT_SIZE.tablet.xxxlarge};
  }
  @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
    font-size: ${Constants.FONT_SIZE.mobile.xxxlarge};
  }
  color: ${props => props.theme.colors.primaryText};
`;

export const CardContainer = styled.section`
  /* display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 28px;
  margin-top: -150px;
  @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
    grid-gap: 8px;
  } */
  @media (min-width: ${p => p.theme.layout.breakpoints.tablet}) {
    /* margin-top: 0px; */
    margin-top: -100px;
    margin-bottom: 20px;
  }
  @media (max-width: calc(${p => p.theme.layout.breakpoints.tablet} - 1px)) {
    margin-top: 0px;
    flex-direction: column;
    row-gap: 16px;
    /* padding: 12px 22px; */
  }
  /* margin-top: -150px; */
  /* margin-top: 30px; */
  display: flex;
  justify-content: space-between;
  /* flex-wrap: wrap; */
`;

export const Card = styled.div`
  background: ${({ total, theme }: CardProps): string =>
    total ? theme.colors.secondary : theme.colors.default};
  /* padding: 22px 32px; */
  padding: 8px 16px;
  border-radius: 5px;
  color: ${({ total, theme }: CardProps): string =>
    total ? theme.colors.secondaryText : theme.colors.primaryText};
  /* width: 100%; */
  display: flex;
  gap: 8px;

  @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
    padding: 12px 22px;
  }

  @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
    flex-direction: column;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: ${Constants.FONT_SIZE.desktop.large};
      @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
        font-size: ${Constants.FONT_SIZE.tablet.large};
      }
      @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
        font-size: ${Constants.FONT_SIZE.mobile.large};
      }
    }
  }

  h1 {
    /* margin-top: 14px; */
    margin-top: auto;
    font-size: ${Constants.FONT_SIZE.desktop.large};
    font-weight: normal;
    /* line-height: 54px; */
    @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
      /* margin-top: 8px; */
      font-size: ${Constants.FONT_SIZE.tablet.large};
      font-weight: normal;
      /* line-height: 44px; */
    }
    @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
      /* margin-top: 8px; */
      font-size: ${Constants.FONT_SIZE.mobile.large};
      font-weight: normal;
      /* line-height: 54px; */
    }
  }

  transition: transform 0.2s ease-in;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const TitleAndViewSelector = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* flex-wrap: wrap; */
  flex-direction: column;
  @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
    margin-top: 24px;
    /* flex-direction: column; */
  }
  h1 {
    margin-right: auto;

    font-weight: 500;
    /* line-height: 54px; */
    line-height: calc(${Constants.FONT_SIZE.desktop.xxlarge} * 1.5);
    color: ${props => props.theme.colors.primaryText};
    font-size: ${Constants.FONT_SIZE.desktop.xxlarge};
    @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
      margin-right: auto;
      font-size: ${Constants.FONT_SIZE.tablet.xxlarge};
      line-height: calc(${Constants.FONT_SIZE.tablet.xxlarge} * 1.5);
    }
    @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
      line-height: calc(${Constants.FONT_SIZE.mobile.xxlarge} * 1.5);
      font-size: ${Constants.FONT_SIZE.mobile.xxlarge};
      /* margin-right: auto; */
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
