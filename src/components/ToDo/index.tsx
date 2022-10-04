import './ToDo.css';

interface Props {
  id: string;
  description: string;
  isCompleted: boolean;
  onCheckClick: () => void;
  onDelete: () => void;
}

const ToDo = ({ description, isCompleted, onCheckClick, onDelete }: Props) => {
  return (
    <div className='todo'>
      <div>{description}</div>
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
