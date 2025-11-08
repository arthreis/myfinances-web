import { createGlobalStyle } from 'styled-components';

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
      font-size: ${({ theme }) => theme.fontSize.tablet.MD};
    }
    @media (max-width: ${p => p.theme.layout.breakpoints.mobile}) {
      font-size: ${({ theme }) => theme.fontSize.mobile.MD};
    }
  }

  button {
    cursor: pointer;
  }

  .themed-swal-text {
    color: ${props => props.theme.colors.primaryText};
  }
`;
