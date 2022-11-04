import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import ToDoList from '../ToDoList';
import { useStore } from '../../startup/getStores';
import { LogOut, QueryUser } from '../../server/UserApi';
import './App.css';
import Navbar from '../Navbar';

const App = () => {
  const userStore = useStore('userStore');
  const todoStore = useStore('toDoStore');

  const { User } = userStore;

  useEffect(() => {
    const getTodos = async () => {
      const user = await QueryUser();
      if (user) {
        todoStore.clearStore();
        todoStore.addToStore(...user.todos);
      }
    };

    if (User.authenticated) {
      getTodos();
    }
  }, [User.authenticated]);

  return (
    <div className='app'>
      <Navbar />
      <ToDoList />
    </div>
  );
};

export default observer(App);
