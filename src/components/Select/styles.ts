import styled, { css } from 'styled-components';
import { tint } from 'polished';

interface SelectContainerProps {
  hasError: boolean;
}

export const Container = styled.div<SelectContainerProps>`
  font-weight: normal;
  ${props =>
    props.hasError &&
    css`
      .react-select__control {
        border: 2px solid ${props.theme.colors.danger};
        display: flex;

        &:hover {
          border: 2px solid ${tint(0.1, props.theme.colors.danger)};
        }
      }
      .react-select__value-container .react-select__value-container {
        display: flex;
        background-color: green;
      }
      .react-select__input-container {
        display: contents;
        background-color: yellow;
      }
    `}
`;
