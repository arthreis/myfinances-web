import styled from 'styled-components';
import { FormStyles } from '../../../styles/commons';

export const Container = styled.div`
  @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
    /* height: 100%; */
    /* width: 100%; */
  }
  @media (min-width: calc(${p => p.theme.layout.breakpoints.tablet} +1px)) {
    /* max-width: 700px; */
  }

  form {
    ${FormStyles}
  }
`;
