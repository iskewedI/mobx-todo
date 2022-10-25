import { observer } from 'mobx-react-lite';
import ToDo from '../ToDo';
import FormInput from '../FormInput';
import './ToDoList.css';
import { useStore } from '../../stores';
import { useState } from 'react';

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
      <FormInput title='Add' onSubmit={handleNewToDo} />

      <div className='todo-list__header'>
        <h3>Description</h3>
        <h3>Completed</h3>
        <h3>Action</h3>
      </div>

      {filteredTodos.map((todo, i) => (
        <div key={todo.id} className='todo-container'>
          <div>
            <ToDo {...todo} index={i} />
          </div>
        </div>
      ))}

      <FormInput title='Filter' debounce={true} debounceMs={70} onChange={handleFilter} />
    </div>
  );
});

export default ToDoList;
