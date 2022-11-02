import axios from 'axios';
import { todosEndpoint, axiosBaseConfig } from './ApiConfig';
import { CREATE_TODO, DELETE_TODO, EDIT_TODO, FETCH_TODOS } from './TodosQueries';

export const getToDoList = async () => {
  const query = {
    operationName: 'fetchTodos',
    query: FETCH_TODOS,
    variables: {},
  };

  try {
    const {
      data: { data },
    } = await axios.post<FetchTodosResponse>(
      todosEndpoint,
      {
        ...query,
      },
      axiosBaseConfig
    );

    return data.todos;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return console.error(
        'Service error trying to POST Todos => ',
        query,
        error.message,
        error
      );
    }

    console.error('Unexpected error trying to get the todos list => ', query, error);
  }
};

export const addNewToDo = async (description: string, isCompleted: boolean) => {
  const query = {
    operationName: 'CreateTodo',
    query: CREATE_TODO,
    variables: { description, isCompleted },
  };

  try {
    const {
      data: { data, errors },
    } = await axios.post<CreateTodoResponse>(todosEndpoint, query, axiosBaseConfig);

    if (errors) {
      throw new Error(errors.message);
    }

    return data.createTodo;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return console.error(
        'Service error trying to POST Todos => ',
        query,
        error.message,
        error
      );
    }

    console.error('Unexpected error trying to create the todo => ', query, error);
  }
};

export const editToDo = async (id: string, data: Partial<ToDoModel>) => {
  const query = {
    operationName: 'EditTodo',
    query: EDIT_TODO,
    variables: { id, data },
  };

  try {
    const {
      data: { data, errors },
    } = await axios.post<EditTodoResponse>(todosEndpoint, query, axiosBaseConfig);

    if (errors) {
      throw new Error(errors.message);
    }

    return data.editTodo;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return console.error(
        'Service error trying to POST Todos => ',
        query,
        error.message,
        error
      );
    }

    console.error('Unexpected error trying to edit the todo => ', data, query, error);
  }
};

export const deleteTodo = async (id: string) => {
  const query = {
    operationName: 'DeleteTodo',
    query: DELETE_TODO,
    variables: { id },
  };

  try {
    const {
      data: { data, errors },
    } = await axios.post<DeleteTodoResponse>(todosEndpoint, query, axiosBaseConfig);

    if (errors) {
      throw new Error(errors.message);
    }

    return data.deleteTodo.success;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return console.error(
        'Service error trying to POST Todo => ',
        query,
        error.message,
        error
      );
    }

    console.error('Unexpected error trying to delete the todo => ', id, query, error);
  }
};
