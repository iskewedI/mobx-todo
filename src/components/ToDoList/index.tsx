import { observer } from 'mobx-react-lite';
import ToDoStore from '../../store/ToDoStore';
import ToDo from '../ToDo';
import FormInput from '../FormInput';
import './ToDoList.css';

interface Props {
  store: ToDoStore;
}

const ToDoList = observer(({ store }: Props) => {
  const orderedTodos = [...store.ToDos].sort((a, b) => a.place - b.place);

  const handleNewToDo = (newValue: string) => {
    store.createToDo(newValue, false);
  };

  return (
    <div className='todo-list'>
      <FormInput title='Add' onSubmit={handleNewToDo} />

      <div className='todo-list__header'>
        <h3>Description</h3>
        <h3>Completed</h3>
        <h3>Action</h3>
      </div>

      {orderedTodos.map((todo, i) => (
        <div key={todo.id} className='todo-container'>
          <div>
            <ToDo {...todo} store={store} index={i} />
          </div>
        </div>
      ))}
    </div>
  );
});

export default ToDoList;
