import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  svg {
    transition: color 0.2s ease;
    margin-right: 8px;

    &:hover {
      cursor: pointer;
      color: ${props => props.theme.colors.secondary};
    }
  }
`;
