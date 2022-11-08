export const GET_USER = `
  query getUser {
    user {
      name
      email
      points
      todos {
        id
        description
        isCompleted
        place
      }
    }
  }
`;

export const REGISTER_USER = `
  mutation newUser($name: String, $email: String, $password: String) {
    createUser(name: $name, email: $email, password: $password){
      name
    }
  }
`;
