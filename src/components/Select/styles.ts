import styled from 'styled-components';
import { InputCssBackground, InputCssBorder } from '../Input/styles';

export const Container = styled.div`
  font-weight: normal;

  .react-select__value-container {
    display: flex;
  }

  .react-select__control {
    ${InputCssBorder}
    ${InputCssBackground}
  }
`;
