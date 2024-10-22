import Theme from './theme';
import { fontSize, layout } from '../commons';

const dark: Theme = {
  title: 'dark',
  colors: {
    primary: '#D75D00',
    secondary: '#202024',
    tertiary: '#29292E',

    background: '#121214',
    success: '#19E475',
    danger: '#E83F4D',
    overlay: '#222222',

    primaryText: '#F0F2F5',
    secondaryText: '#7C7C8A',
    tertiaryText: '#323238',

    white: '#FFF',
    black: '#000',

    // GRAY_700: '#121214',
    // GRAY_600: '#202024',
    // GRAY_500: '#29292E',
    // GRAY_400: '#323238',
    // GRAY_300: '#7C7C8A',
    // GRAY_200: '#C4C4CC',
    // GRAY_100: '#E1E1E6',
    // GRAY_010: '#F9F9F9',
  },
  layout,
  fontSize,
};

export default dark;
