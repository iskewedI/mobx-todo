import { EditableText } from 'new-era-components';
import './ToDo.css';

interface Props {
  id: string;
  description: string;
  isCompleted: boolean;
  onDescriptionChange: (description: string) => void;
  onCheckClick: () => void;
  onDelete: () => void;
}

const ToDo = ({
  description,
  isCompleted,
  onDescriptionChange,
  onCheckClick,
  onDelete,
}: Props) => {
  return (
    <div className='todo'>
      <div>{<EditableText text={description} onChange={onDescriptionChange} />}</div>
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
