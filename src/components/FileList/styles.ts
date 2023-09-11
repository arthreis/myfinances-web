import styled from 'styled-components';
import * as Constants from '../../constants';

export const Container = styled.ul`
  margin-top: 20px;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${props => props.theme.colors.primaryText};

    & + li {
      margin-top: 15px;
    }
  }
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;

  button {
    border: 0;
    background: transparent;
    color: ${props => props.theme.colors.danger};
    margin-left: 5px;
    cursor: pointer;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    span {
      color: ${props => props.theme.colors.defaultText};
      margin-top: 5px;

      font-size: ${Constants.FONT_SIZE.desktop.xsmall};
      @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
        font-size: ${Constants.FONT_SIZE.tablet.xsmall};
      }
      @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
        font-size: ${Constants.FONT_SIZE.mobile.xsmall};
      }
    }

    svg {
      transition: color 0.2s;
      &:hover {
        cursor: pointer;
        color: ${props => props.theme.colors.danger};
      }
    }
  }
`;
