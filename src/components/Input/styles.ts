import styled, { css } from 'styled-components';

export const InputCssBorder = css`
  border: 1px solid ${props =>
    props.theme.title === 'light'
      ? props.theme.colors.tertiary
      : props.theme.colors.tertiary};

  &:hover, :focus {
    border: 1px solid ${props =>
      props.theme.title === 'light'
        ? props.theme.colors.secondaryText
        : props.theme.colors.secondaryText};
  }

`;

export const InputCssBackground = css`
  background-color: ${({ theme }) =>
    theme.title === 'light' ? theme.colors.white : theme.colors.tertiary};

`;

export const InputCssCommom = css`
  ${InputCssBorder}
  ${InputCssBackground}
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  color: ${props => props.theme.colors.primaryText};

  &::placeholder {
    color: ${props => props.theme.colors.secondaryText};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-calendar-picker-indicator {
    ${({ theme }) =>
      theme.title === 'light'
        ? css` filter: invert(0); `
        : css` filter: invert(1); `}
  }
`;

export const InputCustom = styled.input`

  ${InputCssCommom}

  /* input {
    &::placeholder {
      color: ${props => props.theme.colors.primaryText};
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  } */

  /* input[type='date'] {
    display: block;
    margin: 0 auto;
    margin-top: 1em;
    width: 90%;
    outline: none;
    border: none;
    border: 2px solid yellow;
    border-radius: 5px;
    padding: 0.7em 0.5em;
    padding: 8px;
    font-family: Quicksand;
    font-size: 1rem;
  } */
`;
