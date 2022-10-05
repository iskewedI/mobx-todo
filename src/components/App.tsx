import { observer } from 'mobx-react-lite';
import ToDoStore from '../store/ToDoStore';
import ToDoList from './ToDoList';
import FormInput from './FormInput';
import './App.css';

interface Props {
  store: ToDoStore;
}

const App = observer(({ store }: Props) => {
  const handleNewToDo = (newValue: string) => {
    store.createToDo(newValue, false);
  };

  const handleEdit = (id: string, data: Partial<ToDoModel>) => {
    store.editInStore(id, data);
  };

  const handleDelete = (id: string) => {
    store.deleteTodo(id);
  };

  return (
    <div className='app'>
      <ToDoList store={store} onTodoEdit={handleEdit} onDelete={handleDelete} />
      <FormInput title='Add' onSubmit={handleNewToDo} />
    </div>
  );
});

export default App;
