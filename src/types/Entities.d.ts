// API
interface FetchApiResponse<T> {
  data: {
    [P in keyof T]: T[P];
  };
  errors?: ApiError[];
}

interface ApiError {
  locations: unknown[];
  message: string;
  path: string[];
}

type Result = {
  success: boolean;
};

interface ToDoModel {
  id: string;
  description: string;
  isCompleted: boolean;
  place: number;
}

interface FetchTodosResponse {
  data: {
    todos: ToDoModel[];
  };
}

interface CreateTodoResponse {
  data: {
    createTodo: ToDoModel;
  };

  errors: Error;
}

interface EditTodoResponse {
  data: {
    editTodo: ToDoModel;
  };

  errors: Error;
}

interface DeleteTodoResponse {
  data: {
    deleteTodo: Result;
  };

  errors: Error;
}

type Error = {
  message: String;
};
