import React from 'react';
import ToDoStore from './store/ToDoStore';

const toDoStore = new ToDoStore();
toDoStore.init();

export const stores = Object.freeze({
  toDoStore,
});

export const storesContext = React.createContext(stores);
export const StoresProvider = storesContext.Provider;

export const useStores = () => React.useContext(storesContext);

export const useStore = <T extends keyof typeof stores>(store: T): typeof stores[T] =>
  React.useContext(storesContext)[store];
