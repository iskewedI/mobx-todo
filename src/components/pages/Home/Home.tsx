import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import ToDoList from '../../UI/organisms/ToDoList/ToDoList';
import { useStore } from '../../../startup/getStores';
import { QueryUser } from '../../../server/UserApi';
import Navbar from '../../UI/organisms/Navbar/Navbar';
import './Home.css';

const Home = () => {
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
  }, [User.authenticated, todoStore]);

  return (
    <div className='home'>
      <Navbar />
      <ToDoList />
    </div>
  );
};

export default observer(Home);
