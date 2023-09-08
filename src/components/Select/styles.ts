import styled, { css } from 'styled-components';
import { tint } from 'polished';

interface SelectContainerProps {
  hasError: boolean;
}

export const Container = styled.div<SelectContainerProps>`
  font-weight: normal;

  .react-select__value-container {
    display: flex;
  }

  ${props =>
    props.hasError &&
    css`
      .react-select__control {
        border: 2px solid ${props.theme.colors.danger};

        &:hover {
          border: 2px solid ${tint(0.1, props.theme.colors.danger)};
        }
      }
    `}
`;
