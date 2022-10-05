import { observer } from 'mobx-react-lite';
import './ToDoList.css';
import ToDoStore from '../../store/ToDoStore';
import ToDo from '../ToDo';

interface Props {
  store: ToDoStore;
  onTodoEdit: (id: string, data: Partial<ToDoModel>) => void;
  onDelete: (id: string) => void;
}

const ToDoList = observer(({ store, onTodoEdit, onDelete }: Props) => {
  return (
    <div className='todo-list'>
      {store.ToDos.map(todo => (
        <ToDo
          key={todo.id}
          {...todo}
          onDescriptionChange={(description: string) =>
            onTodoEdit(todo.id, { description })
          }
          onCheckClick={() => onTodoEdit(todo.id, { isCompleted: !todo.isCompleted })}
          onDelete={() => onDelete(todo.id)}
        />
      ))}
    </div>
  );
});

export default ToDoList;
