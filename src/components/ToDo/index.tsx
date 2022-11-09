import { observer } from 'mobx-react-lite';
import { EditableText } from 'new-era-components';
import { useStore } from '../../startup/getStores';
import { VerticalDirection } from '../../types/enums';
import ButtonArrow from '../common/ButtonArrow';
import './ToDo.css';
import FabIcon from '../common/FabIcon';
import { getInchSizeFromText } from '../../util/math/calcs';
import { Checkbox } from '@mui/material';
import Cross from '../../static/images-svg/Cross.svg';

interface Props {
  id: string;
  description: string;
  isCompleted: boolean;
  index: number;
}

const ToDo = observer(({ id, index, description, isCompleted }: Props) => {
  const todoStore = useStore('toDoStore');
  const userStore = useStore('userStore');

  const handleOrderChange = (direction: VerticalDirection) => {
    todoStore.chageOrderInStore(id, direction);
  };

  const handleCheckClick = () => {
    todoStore.editInStore(id, { isCompleted: !isCompleted });
  };

  const handleDescriptionChange = (description: string) => {
    todoStore.editInStore(id, { description });
  };

  const handleDelete = () => {
    if (isCompleted) {
      userStore.addPoints(2);
    }

    todoStore.deleteTodo(id);
  };

  const isFirst = index === 0;
  const isLast = index === todoStore.ToDos.length - 1;

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
          title='Completed'
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

      <FabIcon
        icon={Cross}
        onClick={handleDelete}
        title='Remove'
        tooltip={'Remove task'}
      ></FabIcon>
    </div>
  );
});

export default ToDo;
