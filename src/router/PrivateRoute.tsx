import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const { user } = useAuth();

  return user ? <>{children}</> : <Navigate to="/" />;
}

export default PrivateRoute;
