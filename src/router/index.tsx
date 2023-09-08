import React from 'react';
import { Routes, Route } from 'react-router-dom';

import {
  SignIn,
  SignUp,
  Import,
  Config,
  Home,
} from '../pages';
import PrivateRoute from './PrivateRoute';

function Router(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/import"
        element={
          <PrivateRoute>
            <Import />
          </PrivateRoute>
        }
      />
      <Route
        path="/config"
        element={
          <PrivateRoute>
            <Config />
          </PrivateRoute>
        }
      />
      {/* <Redirect from="*" to="/dashboard" /> */}
    </Routes>
  );
}

export default Router;
