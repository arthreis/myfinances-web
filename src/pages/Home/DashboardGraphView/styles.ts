import styled, { css } from 'styled-components';
import * as Constants from '../../../constants';

export const Container = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr;
  gap: 20px;
  margin-top: 40px;
  min-height: 455px;
`;

interface WidgetProps {
  borderLeftColor?: string;
}

export const Widget = styled.div<WidgetProps>`
  padding: 15px 20px;
  border-radius: 5px;
  border-left: 5px solid ${props => props.theme.colors.default};
  background-color: ${props => props.theme.colors.default};
  color: ${props => props.theme.colors.primaryText};

  ${props =>
    props.borderLeftColor &&
    css`
      border-left-color: ${props.borderLeftColor};
    `}

  > header {
    display: flex;
    justify-content: space-between;

    p {
      color: ${props => props.theme.colors.defaultText};
      font-size: ${Constants.FONT_SIZE.desktop.normal};
      @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
        font-size: ${Constants.FONT_SIZE.tablet.normal};
      }
      @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
        font-size: ${Constants.FONT_SIZE.mobile.normal};
      }
    }

    > div.flex {
      display: flex;
      flex-flow: row;

      span {
        padding-bottom: 3px;
        border-bottom: 2px solid transparent;
        width: 20px;
        text-align: center;
        transition: border-color 0.2s ease;

        & + span {
          margin-left: 10px;
        }

        &:hover,
        &.active {
          cursor: pointer;
          border-color: ${props => props.theme.colors.secondary};
        }
      }
    }
  }

  > div {
    margin-top: 20px;
  }

  > span {
    font-size: ${Constants.FONT_SIZE.desktop.xxsmall};
    @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
      font-size: ${Constants.FONT_SIZE.tablet.xxsmall};
    }
    @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
      font-size: ${Constants.FONT_SIZE.mobile.xxsmall};
    }
  }

  h2 {
    font-weight: normal;
    margin-top: 15px;

    font-size: ${Constants.FONT_SIZE.desktop.large};
    @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
      font-size: ${Constants.FONT_SIZE.tablet.large};
    }
    @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
      font-size: ${Constants.FONT_SIZE.mobile.large};
    }

    svg {
      vertical-align: middle;
    }

    > span {
      margin-left: 10px;
      vertical-align: middle;
    }
  }
`;

export const OverviewGridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  > ${Widget} {
    flex: 1;
    & + ${Widget} {
      margin-left: 20px;
    }
  }
`;

export const GraphGridContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr;
  column-gap: 20px;
  @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
`;
