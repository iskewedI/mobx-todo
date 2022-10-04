import { observer } from 'mobx-react-lite';
import './ToDoList.css';
import ToDoStore from '../../store/ToDoStore';
import ToDo from '../ToDo';

interface Props {
  store: ToDoStore;
  onCheckClick: (id: string, isCompleted: boolean) => void;
  onDelete: (id: string) => void;
}

const ToDoList = observer(({ store, onCheckClick, onDelete }: Props) => {
  return (
    <div className='todo-list'>
      {store.ToDos.map(todo => (
        <ToDo
          key={todo.id}
          {...todo}
          onCheckClick={() => onCheckClick(todo.id, !todo.isCompleted)}
          onDelete={() => onDelete(todo.id)}
        />
      ))}
    </div>
  );
});

export default ToDoList;
