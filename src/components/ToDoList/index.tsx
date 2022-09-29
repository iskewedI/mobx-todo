import { observer } from 'mobx-react-lite';
import './ToDoList.css';
import ToDo from '../../store/ToDo';

interface Props {
  store: ToDo;
  onCheckClick: (id: string, isCompleted: boolean) => void;
}

const ToDoList = observer(({ store, onCheckClick }: Props) => {
  return (
    <div className='todo-list'>
      {store.ToDos.map(({ id, description, isCompleted }) => (
        <div key={id} className='todo'>
          <div>{description}</div>
          <button className='todo-button' onClick={() => onCheckClick(id, !isCompleted)}>
            {isCompleted ? '☑' : '☐'}
          </button>
        </div>
      ))}
    </div>
  );
});

export default ToDoList;
