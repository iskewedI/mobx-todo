import { observer } from 'mobx-react-lite';
import ToDoStore from '../../store/ToDoStore';
import ToDo from '../ToDo';
import FormInput from '../FormInput';
import './ToDoList.css';
import { VerticalDirection } from '../../types/enums';

interface Props {
  store: ToDoStore;
  onAdd: (newValue: string) => void;
  onEdit: (id: string, data: Partial<ToDoModel>) => void;
  onDelete: (id: string) => void;
}

const ToDoList = observer(({ store, onAdd, onEdit, onDelete }: Props) => {
  const handleOrderChange = (id: string, direction: VerticalDirection) => {
    store.chageOrderInStore(id, direction);
  };

  const orderedTodos = [...store.ToDos].sort((a, b) => a.place - b.place);

  return (
    <div className='todo-list'>
      <FormInput title='Add' onSubmit={onAdd} />

      <div className='todo-list__header'>
        <h3>Description</h3>
        <h3>Completed</h3>
        <h3>Action</h3>
      </div>

      {orderedTodos.map((todo, i) => (
        <div key={todo.id} className='todo-container'>
          <div>
            <ToDo
              {...todo}
              store={store}
              index={i}
              onDescriptionChange={(description: string) =>
                onEdit(todo.id, { description })
              }
              onCheckClick={() => onEdit(todo.id, { isCompleted: !todo.isCompleted })}
              onDelete={() => onDelete(todo.id)}
              onChangeOrder={(direction: VerticalDirection) =>
                handleOrderChange(todo.id, direction)
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
});

export default ToDoList;
