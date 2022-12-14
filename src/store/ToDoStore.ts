import { configure, makeAutoObservable } from 'mobx';
import { addNewToDo, deleteTodo, editToDo } from '../server/ToDoApi';
import { VerticalDirection } from '../types/enums';

// State always needs to be changed through actions, which in practice also includes creation.
configure({ enforceActions: 'always' });

export default class ToDoStore {
  ToDos: ToDoModel[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async init() {}

  addToStore(...todos: ToDoModel[]) {
    const newTodos = [...this.ToDos, ...todos];

    newTodos.sort((a, b) => a.place - b.place);

    this.ToDos = newTodos;
  }

  clearStore() {
    this.ToDos = [];
  }

  getToDos() {
    return this.ToDos;
  }

  editToDo(index: number, data: ToDoModel) {
    this.ToDos[index] = data;
  }

  _changePlaces(newIndex: number, direction: VerticalDirection) {
    if (direction === VerticalDirection.Down) {
      const replaceTodo = this.ToDos[newIndex];

      replaceTodo.place--;

      const movedTodo = this.ToDos[newIndex - 1];

      this.ToDos = [
        ...this.ToDos.slice(0, newIndex - 1),
        replaceTodo,
        movedTodo,
        ...this.ToDos.slice(newIndex + 1),
      ];
    } else {
      const replaceTodo = this.ToDos[newIndex];

      replaceTodo.place++;

      const movedTodo = this.ToDos[newIndex + 1];

      this.ToDos = [
        ...this.ToDos.slice(0, newIndex),
        movedTodo,
        replaceTodo,
        ...this.ToDos.slice(newIndex + 2),
      ];
    }
  }

  _remove(index: number) {
    this.ToDos.splice(index, 1);
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

  async chageOrderInStore(id: string, direction: VerticalDirection) {
    const todoIndex = this.ToDos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) return console.error("Coulnd't find Todo with id => ", id);

    const newIndex = direction === VerticalDirection.Down ? todoIndex + 1 : todoIndex - 1;

    const replacedTodo = this.ToDos[newIndex];
    if (!replacedTodo)
      return console.error(
        "Couldn't find Todo to replace place with in index => ",
        newIndex
      );

    await this.editInStore(id, { place: replacedTodo.place });
    // From: Inclusive
    // Direction: It defines if it goes up or down, going up it goes adding up by 1 y and if going down it goes substracting by 1
    this._changePlaces(newIndex, direction);
  }

  async deleteTodo(id: string) {
    const success = await deleteTodo(id);
    if (!success) return console.error("Couldn't delete Todo with id => ", id);

    const index = this.ToDos.findIndex(todo => todo.id === id);
    if (index < 0)
      return console.error("Couldn't find Todo in internal store with id =>", id);

    this._remove(index);
  }
}
