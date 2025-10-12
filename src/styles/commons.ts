import { css } from 'styled-components';

export const fontSize = {
  mobile: {
    XS: '8px',
    SM: '10px',
    MD: '14px',
    LG: '20px',
    XL: '24px',
  },
  tablet: {
    XS: '8px',
    SM: '10px',
    MD: '14px',
    LG: '20px',
    XL: '28px',
  },
  desktop: {
    XS: '8px',
    SM: '12px',
    MD: '16px',
    LG: '24px',
    XL: '32px',
  },
};

export const layout = {
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
  },
  maxContainer: '1120px',
};

export const FormStyles = css`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;
