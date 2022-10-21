import { observer } from 'mobx-react-lite';
import { EditableText } from 'new-era-components';
import ToDoStore from '../../store/ToDoStore';
import { VerticalDirection } from '../../types/enums';
import ButtonArrow from '../common/ButtonArrow';
import './ToDo.css';

interface Props {
  store: ToDoStore;
  id?: string;
  description: string;
  isCompleted: boolean;
  index: number;
  onDescriptionChange?: (description: string) => void;
  onCheckClick?: () => void;
  onDelete?: () => void;
  onChangeOrder?: (direction: VerticalDirection) => void;
}

const ToDo = observer(
  ({
    store,
    index,
    description,
    isCompleted,
    onDescriptionChange,
    onCheckClick,
    onDelete,
    onChangeOrder,
  }: Props) => {
    const handleOrderChange = (direction: VerticalDirection) => {
      if (onChangeOrder && typeof onChangeOrder === 'function') {
        onChangeOrder(direction);
      }
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
            onChange={onDescriptionChange}
          />
        </div>

        <button className='todo-button' onClick={onCheckClick}>
          {isCompleted ? '☑' : '☐'}
        </button>
        <button className='todo-button delete-button' onClick={onDelete}>
          Delete
        </button>
      </div>
    );
  }
);

export default ToDo;
