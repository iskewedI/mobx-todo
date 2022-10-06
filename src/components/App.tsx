import { observer } from 'mobx-react-lite';
import ToDoStore from '../store/ToDoStore';
import ToDoList from './ToDoList';
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

  const handleChangeOrder = (id: string, newPlace: number) => {
    store.reorderInStore(id, newPlace);
  };

  return (
    <div className='app'>
      <ToDoList
        store={store}
        onEdit={handleEdit}
        onAdd={handleNewToDo}
        onDelete={handleDelete}
        onChangeOrder={handleChangeOrder}
      />
    </div>
  );
});

export default App;
