import styled, { css } from 'styled-components';
import { rgba, tint, shade } from 'polished';
import Tooltip from '../../../components/Tooltip';

interface TableBodyColumnProps {
  categoryBackground?: string;
}

export const TableBodyColumn = styled.td<TableBodyColumnProps>`
  padding: 20px 32px;
  border: 0;
  background: ${props => props.theme.colors.tertiary};
  border-left-width: 8px;
  border-left-style: solid;
  border-left-color: ${props => props.theme.colors.tertiary};
  font-weight: normal;
  color: ${props => props.theme.colors.primaryText};
  transition: border-left-width 0.2s ease-in;
  font-size: ${({ theme }) => theme.fontSize.desktop.MD};

  @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.tablet.MD};
  }
  @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.mobile.MD};
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

  /* svg {
    transition: color 0.2s;
    &:hover {
      cursor: pointer;
      color: ${props => props.theme.colors.danger};
    }
  } */

  ${props =>
    props.categoryBackground &&
    css`
      border-left-color: ${props.categoryBackground};
      color: ${props.categoryBackground};
    `}
`;

export const TableContainer = styled.section`
  margin-top: 10px;
  min-height: 455px;

  /* @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) { */
  /* overflow-x: auto; */
  /* } */

  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      color: ${props => props.theme.colors.primaryText};
      font-weight: normal;
      padding: 20px 42px;
      text-align: left;
      line-height: 24px;
      height: 30px;
      font-size: ${({ theme }) => theme.fontSize.desktop.MD};

      @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
        font-size: ${({ theme }) => theme.fontSize.tablet.MD};
      }
      @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSize.mobile.MD};
        padding: 10px 21px;
      }

      svg {
        vertical-align: middle;
        cursor: pointer;
      }
    }

    td:first-child {
      border-radius: 8px 0 0 8px;
    }

    td:last-child {
      border-radius: 0 8px 8px 0;
    }
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
      color: ${p => p.theme.colors.primaryText};
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
      content: 'Preço';
    }
    td:nth-of-type(3):before {
      content: 'Categoria';
    }
    td:nth-of-type(4):before {
      content: 'Data';
    }
    td:nth-of-type(5):before {
      content: 'Ações';
    }
  }
`;

export const PaginationContainer = styled.section`
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  width: 100%;
  ul {
    display: flex;
    li {
      display: inline-block;
      height: 50px;
      transition: all 0.2s linear;

      &.previous_page,
      &.next_page {
        background: ${props => props.theme.colors.primary};

        a {
          color: ${props => props.theme.colors.primaryText};
        }
      }
      &.previous_page {
        border-radius: 5px 0 0 5px;
      }
      &.next_page {
        border-radius: 0 5px 5px 0;
      }
      &.active_page {
        background: ${props => props.theme.colors.tertiary};

        a {
          color: ${props => props.theme.colors.primaryText};
          border-top: 0;
          border-bottom: 0;
          border: 1px solid
            ${props => rgba(props.theme.colors.primaryText, 0.1)};
        }
      }

      a {
        cursor: pointer;
        color: ${props => props.theme.colors.primaryText};
        padding: 10px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }

      &:hover:not(.disabled) {
        background: ${props => tint(0.2, props.theme.colors.primary)};
        a {
          color: ${props => props.theme.colors.primaryText};
        }
      }

      &.disabled {
        background: ${props => shade(0.05, props.theme.colors.tertiary)};
        a {
          cursor: not-allowed;
        }
      }
    }
  }
`;

export const RowsByPageContainer = styled.div`
  align-items: center;
  gap: 8px;
  display: flex;

  .react-select__option {
    color: ${props => tint(0.2, props.theme.colors.white)};
  }

  /* .react-select__option:hover {
    background-color: ${props => tint(0.2, props.theme.colors.secondary)};
    } */
    .react-select__option:hover {
    background-color: ${props => tint(0.2, props.theme.colors.secondary)};
  }
`;
