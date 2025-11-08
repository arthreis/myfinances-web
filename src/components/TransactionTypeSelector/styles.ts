import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import { InputCssCommom } from '../Input/styles';

interface TypeInputProps {
  transactionType: 'income' | 'outcome';
  isActive?: boolean;
}

const typeInputVariation = {
  income: css`
    border-color: ${props =>
      props.theme.title === 'light'
        ? rgba(props.theme.colors.success, 0.1)
        : rgba(props.theme.colors.success, 0.2)};
    background: ${props =>
      props.theme.title === 'light'
        ? rgba(props.theme.colors.success, 0.1)
        : rgba(props.theme.colors.success, 0.2)};
  `,
  outcome: css`
    border-color: ${props =>
      props.theme.title === 'light'
        ? rgba(props.theme.colors.danger, 0.1)
        : rgba(props.theme.colors.danger, 0.3)};
    background: ${props =>
      props.theme.title === 'light'
        ? rgba(props.theme.colors.danger, 0.1)
        : rgba(props.theme.colors.danger, 0.3)};
  `,
};

export const TypeInput = styled.div<TypeInputProps>`
  ${InputCssCommom}

  text-align: center;

  & + div {
    margin-left: 8px;
  }

  input {
    appearance: none;
  }

  span {
    vertical-align: middle;
  }

  img {
    vertical-align: middle;
    margin-left: 8px;
  }

  transition: background 0.2s ease-in;

  &:hover {
    ${props => typeInputVariation[props.transactionType]}
  }

  ${props => props.isActive && typeInputVariation[props.transactionType]}
`;

export const Container = styled.div`
  display: flex;
`;
