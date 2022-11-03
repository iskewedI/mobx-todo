import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { StoresProvider, stores } from './startup/getStores';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <StoresProvider value={stores}>
      <App />
    </StoresProvider>
  </React.StrictMode>
);
