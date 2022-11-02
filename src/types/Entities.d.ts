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
    deleteTodo: { success: Boolean };
  };

  errors: Error;
}

interface GrabableElementSet {
  [id: string]: GrabableElement;
}

interface Position {
  x: number;
  y: number;
}

interface GrabableElement extends Position {
  middle: number;
  id: string;
}

interface PassingElement {
  element: GrabableElement;
  from: VerticalPosition;
}

interface GrabbingData {
  target: GrabableElement | null;
  lastPassingElement?: PassingElement;
  assumedDirection?: VerticalDirection;
}

type Error = {
  message: String;
};

interface Cookies {
  All: Map<string, string>;
}
