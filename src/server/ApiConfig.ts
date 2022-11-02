export const authEndpoint = `${process.env.REACT_APP_BACKEND}/auth`;
export const todosEndpoint = `${process.env.REACT_APP_BACKEND}/todos`;
export const axiosBaseConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};
