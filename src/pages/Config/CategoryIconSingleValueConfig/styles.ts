import styled from 'styled-components';

export const Container = styled.div<any>`
  /* text-align: center; */
  background-color: red;
  /* flex: 1; */
  /* display: flex; */
  svg {
    transition: color 0.2s ease;
    /* vertical-align: top; */

    &:hover {
      cursor: pointer;
      color: ${props => props.theme.colors.secondary};
    }
  }
`;
