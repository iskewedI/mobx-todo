declare interface ToDoModel {
  id: string;
  description: string;
  isCompleted: boolean;
  place: number;
}

declare interface FetchTodosResponse {
  data: {
    todos: ToDoModel[];
  };
}

declare interface CreateTodoResponse {
  data: {
    createTodo: ToDoModel;
  };

  errors: Error;
}

declare interface EditTodoResponse {
  data: {
    editTodo: ToDoModel;
  };

  errors: Error;
}

declare interface DeleteTodoResponse {
  data: {
    deleteTodo: { success: Boolean };
  };

  errors: Error;
}

declare interface GrabableElementSet {
  [id: string]: GrabableElement;
}

declare interface Position {
  x: number;
  y: number;
}

declare interface GrabableElement extends Position {
  middle: number;
  id: string;
}

declare interface PassingElement {
  element: GrabableElement;
  from: VerticalPosition;
}

declare interface GrabbingData {
  target: GrabableElement | null;
  lastPassingElement?: PassingElement;
  assumedDirection?: VerticalDirection;
}

declare type Error = {
  message: String;
};
