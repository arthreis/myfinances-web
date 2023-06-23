import React from 'react';

import { AppThemeProvider } from './theme';
import { AuthProvider } from './auth';

function AppProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <AppThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </AppThemeProvider>
  );
}

export default AppProvider;
