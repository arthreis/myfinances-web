import Theme from './theme';

const light: Theme = {
  title: 'light',
  colors: {
    primary: '#1DB954',
    secondary: '#191414',
    tertiary: '#fff',
    background: '#F0F2F5',
    success: '#12a454',
    danger: '#e83f5b',
    overlay: '#333333',

    primaryText: '#363f5f',
    secondaryText: '#fff',
    defaultText: '#969cb3',
    successText: '#fff',
    dangerText: '#fff',
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

export default light;
