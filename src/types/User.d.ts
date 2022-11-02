type User = {
  name: string;
  email: string;
  todos: [ToDoModel];
};

type AuthData = {
  authenticated: boolean;
};

// API
type AuthUserResponse = {
  token: string;
  user: {
    name: string;
    email: string;
  };
};

type RegisterUserResponse = {
  createUser: {
    email: string;
  };
};

type QueryUserResponse = {
  user: User;
};
