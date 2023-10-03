import Theme from './theme';

const light: Theme = {
  title: 'light',
  colors: {
    primary: '#5636d3',
    secondary: '#ff872c',
    default: '#fff',
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
    maxContainer: '960px',
  },
};

export default light;
