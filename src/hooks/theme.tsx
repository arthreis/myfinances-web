import React, { useCallback, useContext, createContext } from 'react';
import { ThemeProvider } from 'styled-components';

import usePersistedState from './usePersistedState';

import Theme from '../styles/themes/theme';
import light from '../styles/themes/light';
import dark from '../styles/themes/dark';
import { constants } from '../utils/constants';

interface ThemeContextData {
  theme: Theme;
  toggleTheme(): void;
}

const ThemeContext = createContext({} as ThemeContextData);

export function AppThemeProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [theme, setTheme] = usePersistedState<Theme>(
    `${constants.NAME_KEY_STORAGE}/theme`,
    light,
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme.title === 'light' ? dark : light);
  }, [theme, setTheme]);

  const themeProvider = React.useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={themeProvider}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context)
    throw new Error('useAuth must be used within an AppThemeProvider');

  return context;
}
