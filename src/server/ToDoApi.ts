import { v4 as uuidv4 } from 'uuid';

const DB: ToDoModel[] = [
  { id: uuidv4(), description: 'Make bed', isCompleted: true },
  { id: uuidv4(), description: 'Buy fruits', isCompleted: false },
  { id: uuidv4(), description: 'Make breakfast', isCompleted: false },
  { id: uuidv4(), description: 'Kiss lu', isCompleted: true },
];

const sleep = (time: number) =>
  new Promise(res => {
    setTimeout(() => {
      res(null);
    }, time);
  });

export const getToDoList = async () => {
  // Act as if calling a backend server
  await sleep(250);

  return DB;
};

export const addNewToDo = async (description: string, isCompleted: boolean) => {
  // Act as if calling a backend server
  await sleep(15);

  const newToDo: ToDoModel = {
    id: uuidv4(),
    description,
    isCompleted,
  };

  DB.push(newToDo);

  return newToDo;
};

export const editToDo = async (id: string, data: Partial<ToDoModel>) => {
  await sleep(15);

  const index = DB.findIndex(todo => todo.id === id);
  if (index < 0) throw new Error(`Couldn't find todo with id => ${id}`);

  DB[index].description = data.description ?? DB[index].description;
  DB[index].isCompleted = data.isCompleted ?? DB[index].isCompleted;

  return DB[index];
};
