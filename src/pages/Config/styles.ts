import styled from 'styled-components';

import Tooltip from '../../components/Tooltip';
import Button from '../../components/Button';
import * as Constants from '../../constants';

export const Container = styled.div`
  width: 100%;
  max-width: ${p => p.theme.layout.maxContainer};
  margin: 0 auto;
  padding: 40px 20px;
  @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
    padding: 10px 20px;
  }
`;

export const Title = styled.h1`
  font-weight: 500;
  line-height: 54px;
  color: ${props => props.theme.colors.primaryText};
  text-align: center;

  font-size: ${Constants.FONT_SIZE.desktop.xxlarge};
  @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
    font-size: ${Constants.FONT_SIZE.tablet.xxlarge};
  }
  @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
    font-size: ${Constants.FONT_SIZE.mobile.xxlarge};
  }
`;

export const TableContainer = styled.section`
  margin-top: 20px;
  /* overflow-x: auto; */

  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      color: ${props => props.theme.colors.defaultText};
      font-weight: normal;
      padding: 20px 42px;
      text-align: left;
      line-height: 24px;
      height: 30px;
      font-size: ${Constants.FONT_SIZE.desktop.normal};

      @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
        font-size: ${Constants.FONT_SIZE.tablet.normal};
      }
      @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
        font-size: ${Constants.FONT_SIZE.mobile.normal};
        padding: 10px 21px;
      }
    }

    /* @media (min-width: calc(${p =>
      p.theme.layout.breakpoints.tablet} + 1)) { */
    td:first-child {
      border-radius: 8px 0 0 8px;
    }
    td:last-child {
      border-radius: 0 8px 8px 0;
    }
    /* } */
  }

  /* @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) { */
  @media only screen and (max-width: 768px) {
    /* Force table to not be like tables anymore */
    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

    /* Hide table headers (but not display: none;, for accessibility) */
    thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }

    tr {
      /* border: 1px solid #ccc; */
      border-radius: 8px;
      margin: 16px 0px;
    }

    td:first-child {
      border-radius: 8px 8px 0 0 !important;
    }

    td:last-child {
      border-radius: 0 0 8px 8px !important;
    }

    td::before {
      /* background-color: red; */
      /* text-align: center; */
      padding-left: 16px;
    }

    td {
      /* Behave  like a "row" */
      border: none;
      border-bottom: 1px solid #eee;
      position: relative;
      padding-left: 50%;
    }

    td:before {
      /* Now like a table header */
      position: absolute;
      /* Top/left values mimic padding */
      /* top: 6px; */
      left: 6px;
      width: 45%;
      padding-right: 10px;
      white-space: nowrap;
    }

    /*
	Label the data
	*/
    td:nth-of-type(1):before {
      content: 'Titulo';
    }
    td:nth-of-type(2):before {
      content: 'Ícone';
    }
    td:nth-of-type(3):before {
      content: 'Cor Dark';
    }
    td:nth-of-type(4):before {
      content: 'Cor Light';
    }
    td:nth-of-type(5):before {
      content: 'Ações';
    }
  }
`;

export const TableBodyColumn = styled.td`
  padding: 20px 32px;
  border: 0;
  background: ${props => props.theme.colors.tertiary};
  border-left-width: 8px;
  border-left-style: solid;
  border-left-color: ${props => props.theme.colors.tertiary};
  font-weight: normal;
  color: ${props => props.theme.colors.defaultText};
  transition: border-left-width 0.2s ease-in;
  font-size: ${Constants.FONT_SIZE.desktop.normal};

  @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
    font-size: ${Constants.FONT_SIZE.tablet.normal};
    padding: 10px 16px;
  }
  @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
    font-size: ${Constants.FONT_SIZE.mobile.normal};
    padding: 10px 16px;
  }

  &.title {
    color: ${props => props.theme.colors.primaryText};
  }

  &.category {
    svg {
      vertical-align: sub;
      margin-right: 10px;
    }
  }

  &.income {
    color: ${props => props.theme.colors.success};
  }

  &.outcome {
    color: ${props => props.theme.colors.danger};
  }
`;

interface SquareProps {
  background: string;
}

export const Square = styled.div<SquareProps>`
  padding: 5px;
  width: 15px;
  height: 15px;
  border-radius: 5px;
  background-color: ${props => props.background};
`;

export const ColorInfoContainer = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-left: 10px;
  }
`;

export const CustomTooltip = styled(Tooltip)`
  width: 20px;
  height: 20px;

  /* color: ${props => (props.className === 'delete' ? 'blue' : 'green')}; */

  span {
    background: ${props =>
      props.className === 'delete'
        ? props.theme.colors.danger
        : props.theme.colors.success};
    color: ${props =>
      props.className === 'delete'
        ? props.theme.colors.dangerText
        : props.theme.colors.successText};

    &::before {
      border-color: ${props =>
          props.className === 'delete'
            ? props.theme.colors.danger
            : props.theme.colors.success}
        transparent;
    }
  }

  svg {
    transition: color 0.2s;
    &:hover {
      cursor: pointer;
      color: ${props =>
        props.className === 'delete'
          ? props.theme.colors.danger
          : props.theme.colors.success};
    }
  }
`;

export const NewCategoryButton = styled(Button)`
  width: 200px;
  margin-top: 0;
`;

export const Actions = styled.div`
  display: flex;
  gap: 64px;
  @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
    gap: 24px;
  }
`;
