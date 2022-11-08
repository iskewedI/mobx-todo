import { observer } from 'mobx-react-lite';
import ToDo from '../ToDo';
import FormInput from '../FormInput';
import './ToDoList.css';
import { useStore } from '../../startup/getStores';
import { useState } from 'react';
import { Typography } from '@mui/material';
import ExpandInput from '../ExpandInput';

const ToDoList = observer(() => {
  const [filter, setFilter] = useState('');

  const todoStore = useStore('toDoStore');

  const handleNewToDo = (newValue: string) => {
    todoStore.createToDo(newValue, false);
  };

  const handleFilter = (search: string | undefined) => {
    setFilter(search || '');
  };

  const orderedTodos = [...todoStore.ToDos].sort((a, b) => a.place - b.place);

  const filteredTodos = orderedTodos.filter(todo =>
    todo.description.toLowerCase().startsWith(filter.toLowerCase())
  );

  return (
    <div className='todo-list'>
      <div className='todo-list__header'>
        <Typography variant='h4'>Tasks</Typography>
        <ExpandInput onSubmit={handleNewToDo} />
      </div>

      <div className='todo-list__items'>
        {filteredTodos.map((todo, i) => (
          <div key={todo.id} className='todo-container'>
            <div>
              <ToDo {...todo} index={i} />
            </div>
          </div>
        ))}
      </div>

      <FormInput title='Search' debounce={true} debounceMs={70} onChange={handleFilter} />
    </div>
  );
});

export default ToDoList;
