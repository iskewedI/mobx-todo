import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import ToDoList from '../ToDoList';
import AuthForm from '../AuthForm';
import { useStore } from '../../startup/getStores';
import { LogOut, QueryUser } from '../../server/UserApi';
import './App.css';

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

  const handleLogOut = async () => {
    const result = await LogOut();

    if (result && result.success) {
      window.location.reload();
    }
  };

  return (
    <div className='app'>
      <div className='navbar'>
        {User.authenticated && (
          <div>
            <h2>{User.name}</h2>
            <button onClick={handleLogOut}>Log out</button>
          </div>
        )}
        {!User.authenticated && <AuthForm />}
      </div>
      <ToDoList />
    </div>
  );
};

export default observer(App);
