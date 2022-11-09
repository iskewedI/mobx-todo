import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './components/pages/Home/Home';
import { StoresProvider, stores } from './startup/getStores';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <StoresProvider value={stores}>
      <Home />
    </StoresProvider>
  </React.StrictMode>
);
