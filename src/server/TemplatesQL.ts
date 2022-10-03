export const FETCH_TODOS = `
  query fetchTodos {
    todos {
      id
      description
      isCompleted
    }
  }
`;

export const CREATE_TODO = `
  mutation CreateTodo($description: String!, $isCompleted: Boolean) {
    createTodo(description: $description, isCompleted: $isCompleted) {
      id
      description
      isCompleted
    }
  }
`;

export const EDIT_TODO = `
  mutation EditTodo($id: String!, $data: EditInput) {
    editTodo(id: $id, data: $data){
        id
        description
        isCompleted
    }
  }
`;
