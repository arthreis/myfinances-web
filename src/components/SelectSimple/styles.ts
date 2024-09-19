import styled, { css } from 'styled-components';
import { tint } from 'polished';

interface SelectContainerProps {
  hasError?: boolean;
}

export const Container = styled.div<SelectContainerProps>`
  font-weight: normal;

  .react-select__value-container {
    display: flex;
  }

  .react-select__single-value {
    color: ${({ theme }) => theme.colors.defaultText};
  }

  .react-select__control {
    height: 50px;
    border-width: 0;
  }
`;
