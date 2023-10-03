import { createGlobalStyle } from 'styled-components';
import * as Constants from '../constants';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    border: 0;
  }

  body {
    background: ${props => props.theme.colors.background} ;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button, textarea {
    font: 16px "Poppins", sans-serif;
    @media (max-width: ${p => p.theme.layout.breakpoints.tablet}) {
      font-size: ${Constants.FONT_SIZE.tablet.normal};
    }
    @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
      font-size: ${Constants.FONT_SIZE.mobile.normal};
    }
  }

  button {
    cursor: pointer;
  }

  .themed-swal-text {
    color: ${props => props.theme.colors.primaryText};
  }
`;
