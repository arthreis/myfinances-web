import Theme from './theme';

const dark: Theme = {
  title: 'dark',
  colors: {
    primary: '#424242',
    secondary: '#D75D00',
    tertiary: '#505050',
    background: '#333',
    success: '#19E475',
    danger: '#E83F4D',
    overlay: '#222222',

    primaryText: '#F0F2F5',
    secondaryText: '#F0F2F5',
    defaultText: '#F0F2F5',
    successText: '#F0F2F5',
    dangerText: '#F0F2F5',
  },
  layout: {
    breakpoints: {
      mobile: '480px',
      tablet: '768px',
      desktop: '1024px',
    },
    maxContainer: '1120px',
  },
  fontSize: {
    XS: '8px',
    SM: '12px',
    MD: '16px',
    LG: '20px',
    XL: '32px',
  },
};

export default dark;
