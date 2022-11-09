import { configure, makeAutoObservable } from 'mobx';
import { AddPoints, LogIn, QueryUser, Register } from '../server/UserApi';

// State always needs to be changed through actions, which in practice also includes creation.
configure({ enforceActions: 'always' });

// TODO: Make sure the user is able to create "local todos" without being logged in, but write a message
// encouraging him to create an account.
// TODO: Loading state - With skeleton loading
export default class UserStore {
  User: Partial<User> & AuthData = {
    authenticated: false,
    name: '',
    email: '',
    points: 0,
  };

  constructor() {
    makeAutoObservable(this);
  }

  async init() {
    const user = await this.getUserData();

    if (user) {
      this.setUser(user, true);
    }
  }

  setUser(data: Partial<User>, authenticated?: boolean) {
    this.User = {
      name: data.name || this.User.name,
      email: data.email || this.User.email,
      points: data.points !== undefined ? data.points : this.User.points,
      authenticated:
        authenticated !== undefined ? authenticated : this.User.authenticated,
    };
  }

  async getUserData() {
    return await QueryUser();
  }

  async logIn(email: string, password: string) {
    const authData = await LogIn(email, password);
    if (!authData) return;

    const { user } = authData;

    this.setUser({ name: user.name, email, points: user.points }, true);
  }

  async register(userName: string, email: string, password: string): Promise<Result> {
    const result = await Register(userName, email, password);
    if (!result) return { success: false };

    return { success: true };
  }

  async addPoints(amount: number) {
    const result = await AddPoints(amount);

    if (result) {
      this.setUser({ points: result.currentPoints });
    }
  }
}
