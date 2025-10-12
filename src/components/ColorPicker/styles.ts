import styled from 'styled-components';

import { InputCssBackground, InputCssCommom } from '../Input/styles';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

interface ColorSquareProps {
  color: string;
}

export const ColorSquare = styled.div<ColorSquareProps>`
  padding: 5px;
  width: 15px;
  height: 15px;
  border-radius: 5px;
  background: ${props => props.color};
`;

export const BlockPickerCover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
`;

export const BlockPickerContainer = styled.div`
  position: absolute;
  z-index: 2;
  top: 100%;
  margin-top: 20px;
  left: 0;
`;

export const Container = styled.div<ContainerProps>`
  ${InputCssCommom}
  display: flex;
  align-items: center;

  position: relative;

    input {
      ${InputCssBackground}
      color: ${props => props.theme.colors.primaryText};
    }

  > ${ColorSquare} {
    margin-right: 16px;
  }
`;
