import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import AppProvider from './hooks';

import Router from './router';

import GlobalStyle from './styles/global';
import 'react-toastify/dist/ReactToastify.css';

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <AppProvider>
        <Router />
        <GlobalStyle />
      </AppProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
