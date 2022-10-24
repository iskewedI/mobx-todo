import { observer } from 'mobx-react-lite';
import { EditableText } from 'new-era-components';
import ToDoStore from '../../store/ToDoStore';
import { useStore } from '../../stores';
import { VerticalDirection } from '../../types/enums';
import ButtonArrow from '../common/ButtonArrow';
import './ToDo.css';

interface Props {
  id: string;
  description: string;
  isCompleted: boolean;
  index: number;
}

const ToDo = observer(({ id, index, description, isCompleted }: Props) => {
  const store = useStore('toDoStore');

  const handleOrderChange = (direction: VerticalDirection) => {
    store.chageOrderInStore(id, direction);
  };

  const handleCheckClick = () => {
    store.editInStore(id, { isCompleted: !isCompleted });
  };

  const handleDescriptionChange = () => {
    store.editInStore(id, { description });
  };

  const handleDelete = () => {
    store.deleteTodo(id);
  };

  const isFirst = index === 0;
  const isLast = index === store.ToDos.length - 1;

  return (
    <div className='todo'>
      <div className='todo__description'>
        <div className='todo__arrows'>
          <ButtonArrow
            disabled={isFirst}
            onClick={() => handleOrderChange(VerticalDirection.Up)}
            direction={VerticalDirection.Up}
          />
          <ButtonArrow
            disabled={isLast}
            onClick={() => handleOrderChange(VerticalDirection.Down)}
            direction={VerticalDirection.Down}
          />
        </div>
        <EditableText
          containerClasses='todo__description__text'
          text={description}
          onChange={handleDescriptionChange}
        />
      </div>

      <button className='todo-button' onClick={handleCheckClick}>
        {isCompleted ? '☑' : '☐'}
      </button>
      <button className='todo-button delete-button' onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
});

export default ToDo;
