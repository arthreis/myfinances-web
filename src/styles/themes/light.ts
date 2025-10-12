import { fontSize, layout } from '../commons';
import type Theme from './theme';

const light: Theme = {
  title: 'light',
  colors: {
    primary: '#1DB954',
    secondary: '#191414',
    tertiary: '#E1E1E6',

    background: '#F0F2F5',
    success: '#12A454',
    danger: '#E83F5B',
    overlay: '#333333',

    primaryText: '#121214',
    secondaryText: '#969cb3',
    tertiaryText: '#DDD',

    white: '#FFF',
    black: '#000',
  },
  layout,
  fontSize,
};

export default light;
