import styled from 'styled-components';

export const Container = styled.div<any>`
  text-align: center;
  svg {
    transition: color 0.2s ease;
    vertical-align: middle;

    &:hover {
      cursor: pointer;
      color: ${props => props.theme.colors.secondary};
    }
  }
`;
