import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import ToDoStore from './store/ToDoStore';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const toDoStore = new ToDoStore();
toDoStore.init();

root.render(
  <React.StrictMode>
    <App store={toDoStore} />
  </React.StrictMode>
);
