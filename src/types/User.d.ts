type User = {
  name: string;
  email: string;
  todos: [ToDoModel];
};

type UserData = {
  name: string;
  email: string;
  password: string;
};

type AuthData = {
  authenticated: boolean;
};

// LogIn - Register modal
type ModalState = {
  open: Boolean;
  currentOption: FormOptions;
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
