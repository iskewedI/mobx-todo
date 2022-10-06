import { makeObservable, observable, action, configure } from 'mobx';
import { addNewToDo, deleteTodo, editToDo, getToDoList } from '../server/ToDoApi';
import { VerticalDirection } from '../types/enums';

// State always needs to be changed through actions, which in practice also includes creation.
configure({ enforceActions: 'always' });

export default class ToDoStore {
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
      _remove: action,
      deleteTodo: action,
      _changePlace: action,
      reorderInStore: action,
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

  _changePlace(newIndex: number, newPlace: number, direction: VerticalDirection) {
    if (direction === VerticalDirection.Down) {
      this.ToDos.slice(0, newIndex).forEach(todo => {
        if (todo.place !== 0) {
          console.log(`Reducing todo ${todo.description} from place ${todo.place} -1`);
          todo.place -= 1;
        } else {
          console.log('Letting todo in 0', todo.description);
        }
      });
    } else {
      this.ToDos.slice(newIndex + 1).forEach((todo, i, arr) => {
        if (i !== arr.length - 1) {
          todo.place += 1;
        }
      });
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

  async reorderInStore(id: string, newPlace: number) {
    const index = this.ToDos.findIndex(todo => todo.id === id);
    if (index === -1) return console.error("Coulnd't find Todo with id => ", id);

    const currentPlace = this.ToDos[index].place;
    let direction: VerticalDirection;

    if (currentPlace < newPlace) {
      direction = VerticalDirection.Down;
    } else {
      direction = VerticalDirection.Up;
    }

    const replacedIndex = this.ToDos.findIndex(todo => todo.place === newPlace);
    if (replacedIndex === -1)
      console.error("Couldn't find Todo with place => ", newPlace);

    this._changePlace(replacedIndex, newPlace, direction);
    await this.editInStore(id, { place: newPlace });
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
