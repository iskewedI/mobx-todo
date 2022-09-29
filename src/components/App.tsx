import ToDo from '../store/ToDo';
import { observer } from 'mobx-react-lite';
import './App.css';
import ToDoList from './ToDoList';
import FormInput from './FormInput';

interface Props {
  store: ToDo;
}

const App = observer(({ store }: Props) => {
  const handleNewToDo = (newValue: string) => {
    store.createToDo(newValue, false);
  };

  const handleCheckClick = (id: string, isCompleted: boolean) => {
    store.editInStore(id, { isCompleted });
  };

  console.log(store.getToDos());

  return (
    <div className='app'>
      <ToDoList store={store} onCheckClick={handleCheckClick} />
      <FormInput title='Add' onSubmit={handleNewToDo} />
    </div>
  );
});

export default App;
