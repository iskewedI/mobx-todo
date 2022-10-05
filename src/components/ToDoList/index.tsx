import { observer } from 'mobx-react-lite';
import './ToDoList.css';
import ToDoStore from '../../store/ToDoStore';
import ToDo from '../ToDo';
import FormInput from '../FormInput';

interface Props {
  store: ToDoStore;
  onAdd: (newValue: string) => void;
  onEdit: (id: string, data: Partial<ToDoModel>) => void;
  onDelete: (id: string) => void;
}

const ToDoList = observer(({ store, onAdd, onEdit, onDelete }: Props) => {
  return (
    <div className='todo-list'>
      <div className='todo-list__header'>
        <h3>Description</h3>
        <h3>Completed</h3>
        <h3>Action</h3>
      </div>
      {store.ToDos.map(todo => (
        <ToDo
          key={todo.id}
          {...todo}
          onDescriptionChange={(description: string) => onEdit(todo.id, { description })}
          onCheckClick={() => onEdit(todo.id, { isCompleted: !todo.isCompleted })}
          onDelete={() => onDelete(todo.id)}
        />
      ))}
      <FormInput title='Add' onSubmit={onAdd} />
    </div>
  );
});

export default ToDoList;
