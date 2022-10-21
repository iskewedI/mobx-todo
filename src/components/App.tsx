import { observer } from 'mobx-react-lite';
import ToDoStore from '../store/ToDoStore';
import ToDoList from './ToDoList';
import './App.css';

interface Props {
  store: ToDoStore;
}

const App = observer(({ store }: Props) => {
  return (
    <div className='app'>
      <ToDoList store={store} />
    </div>
  );
});

export default App;
