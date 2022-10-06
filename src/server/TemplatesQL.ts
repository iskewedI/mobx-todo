export const FETCH_TODOS = `
  query fetchTodos {
    todos {
      id
      description
      isCompleted
      place
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
        place
    }
  }
`;

export const DELETE_TODO = `
  mutation DeleteTodo($id: String!) {
    deleteTodo(id: $id){
      success
    }
  }
`;
