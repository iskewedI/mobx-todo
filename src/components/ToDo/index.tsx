import { observer } from 'mobx-react-lite';
import { EditableText } from 'new-era-components';
import { useStore } from '../../startup/getStores';
import { VerticalDirection } from '../../types/enums';
import ButtonArrow from '../common/ButtonArrow';
import './ToDo.css';
import RemoveButton from '../common/RemoveButton';
import { getInchSizeFromText } from '../../util/math/calcs';
import { Checkbox } from '@mui/material';

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

  const handleDescriptionChange = (description: string) => {
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

        <Checkbox
          checked={isCompleted}
          color='success'
          size='small'
          onClick={handleCheckClick}
        />

        <div className='todo__description__text-container'>
          <EditableText
            containerClasses='todo__description__text'
            text={description}
            onSubmit={handleDescriptionChange}
            enabled={!isCompleted}
          />
          <hr
            style={{ width: getInchSizeFromText(description) }}
            className={`line-throught ${isCompleted ? 'shown' : 'hidden'}`}
          />
        </div>
      </div>

      <RemoveButton onClick={handleDelete}></RemoveButton>
    </div>
  );
});

export default ToDo;
