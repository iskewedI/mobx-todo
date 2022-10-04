declare interface ToDoModel {
  id: string;
  description: string;
  isCompleted: boolean;
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

declare type Error = {
  message: String;
};
