import { EditableText } from 'new-era-components';
import './ToDo.css';

interface Props {
  id?: string;
  refObj?: React.RefObject<HTMLDivElement>;
  description: string;
  isCompleted: boolean;
  onDescriptionChange?: (description: string) => void;
  onCheckClick?: () => void;
  onDelete?: () => void;
}

const ToDo = ({
  refObj,
  description,
  isCompleted,
  onDescriptionChange,
  onCheckClick,
  onDelete,
}: Props) => {
  return (
    <div className='todo' ref={refObj}>
      <EditableText
        containerClasses='todo__description'
        text={description}
        onChange={onDescriptionChange}
      />
      <button className='todo-button' onClick={onCheckClick}>
        {isCompleted ? '☑' : '☐'}
      </button>
      <button className='todo-button delete-button' onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

export default ToDo;
