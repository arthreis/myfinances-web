import React, { createContext, useContext, useState, useCallback } from 'react';

import api from '../services/api';
import { constants } from '../utils/constants';

interface AuthState {
  token: string;
  user: any;
}

interface SignUpCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  token: string;
  user: any;
  signIn(credentials: SignUpCredentials): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem(`${constants.NAME_KEY_STORAGE}/user`);
    const token = localStorage.getItem(`${constants.NAME_KEY_STORAGE}/token`);

    if (user && token) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        token,
        user: JSON.parse(user),
      };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignUpCredentials) => {
    const response = await api.post('/sessions', { email, password });

    const { user, token } = response.data;

    localStorage.setItem(`${constants.NAME_KEY_STORAGE}/user`, JSON.stringify(user));
    localStorage.setItem(`${constants.NAME_KEY_STORAGE}/token`, token);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ user, token });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(`${constants.NAME_KEY_STORAGE}/user`);
    localStorage.removeItem(`${constants.NAME_KEY_STORAGE}/token`);

    setData({} as AuthState);
  }, []);

  const userProvider = React.useMemo(
    () => ({ user: data.user, signIn, signOut, token: data.token }),
    [data.user, signIn, signOut, data.token],
  );

  return (
    <AuthContext.Provider value={userProvider}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
