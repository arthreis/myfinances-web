import Theme from './themes/theme';

declare module 'styled-components' {
  export type DefaultTheme = Theme;
}
