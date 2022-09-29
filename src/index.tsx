import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css';
import ToDo from './store/ToDo';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const toDoStore = new ToDo();
toDoStore.init();

root.render(
  <React.StrictMode>
    <App store={toDoStore} />
  </React.StrictMode>
);
