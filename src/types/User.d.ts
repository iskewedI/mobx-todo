type User = {
  name: string;
  email: string;
  points: number;
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

// API
type AuthUserResponse = {
  token: string;
  user: {
    name: string;
    email: string;
    points: number;
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

type AddPointsResult = {
  addPoints: {
    currentPoints: number;
  };
};
