import styled from 'styled-components';

export const Container = styled.div`
  font-weight: normal;

  .react-select__value-container {
    display: flex;
  }

  .react-select__single-value {
    /* color: ${({ theme }) => theme.colors.primaryText}; */
  }

  .react-select__control {
    height: 50px;
    border-width: 0;
  }
`;
