import { makeObservable, observable, action, configure } from 'mobx';
import { addNewToDo, editToDo, getToDoList } from '../server/ToDoApi';

// State always needs to be changed through actions, which in practice also includes creation.
configure({ enforceActions: 'always' });

export default class ToDo {
  ToDos: ToDoModel[] = [];

  constructor() {
    makeObservable(this, {
      ToDos: observable,
      init: action,
      addToStore: action,
      editInStore: action,
      getToDos: action,
      createToDo: action,
      editToDo: action,
    });
  }

  async init() {
    const response = await getToDoList();
    if (response) {
      this.addToStore(...response);
    }
  }

  addToStore(...todos: ToDoModel[]) {
    this.ToDos.push(...todos);
  }

  getToDos() {
    return this.ToDos;
  }

  editToDo(index: number, data: ToDoModel) {
    this.ToDos[index] = data;
  }

  async createToDo(description: string, isCompleted: boolean) {
    const response = await addNewToDo(description, isCompleted);
    if (response) {
      this.addToStore(response);
    }
  }

  async editInStore(id: string, newData: Partial<ToDoModel>) {
    try {
      const editedToDo = await editToDo(id, newData);
      if (!editedToDo) return;

      const index = this.ToDos.findIndex(todo => todo.id === id);

      this.editToDo(index, editedToDo);
    } catch (error) {
      console.error(error);
    }
  }
}
