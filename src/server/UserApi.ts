import axios from 'axios';
import { ADD_PONTS, GET_USER, REGISTER_USER } from './UserQueries';
import { todosEndpoint, authEndpoint, axiosBaseConfig } from '../util/ApiConfig';

export const Register = async (
  name: string,
  email: string,
  password: string
): Promise<Result> => {
  const query = {
    operationName: 'newUser',
    query: REGISTER_USER,
    variables: { name, email, password },
  };

  try {
    const {
      data: { errors },
    } = await axios.post<FetchApiResponse<RegisterUserResponse>>(
      todosEndpoint,
      query,
      axiosBaseConfig
    );

    if (errors) {
      throw new Error('GQL call came with errors => ' + errors[0].message);
    }

    return { success: true };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Service error trying to auth user => ', error.message, error);
    }

    console.error('Unexpected error trying to auth the user => ', error);

    return { success: false };
  }
};

export const LogIn = async (email: string, password: string) => {
  try {
    const { data } = await axios.post<AuthUserResponse>(
      authEndpoint,
      {
        email,
        password,
      },
      axiosBaseConfig
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return console.error('Service error trying to auth user => ', error.message, error);
    }

    console.error('Unexpected error trying to auth the user => ', error);
  }
};

export const LogOut = async () => {
  try {
    await axios.delete(authEndpoint, axiosBaseConfig);

    return { success: true };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return console.error(
        'Service error trying to log out user => ',
        error.message,
        error
      );
    }

    console.error('Unexpected error trying to log outthe user => ', error);
  }
};

export const QueryUser = async () => {
  const query = {
    operationName: 'getUser',
    query: GET_USER,
    variables: {},
  };

  try {
    const {
      data: { data, errors },
    } = await axios.post<FetchApiResponse<QueryUserResponse>>(
      todosEndpoint,
      query,
      axiosBaseConfig
    );

    if (errors) {
      return null;
    }

    return data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return console.error(
        'Service error trying to query user => ',
        query,
        error.message,
        error
      );
    }

    console.error('Unexpected error trying to query the user => ', query, error);
  }
};

export const AddPoints = async amount => {
  const query = {
    operationName: 'AddPoints',
    query: ADD_PONTS,
    variables: { amount },
  };

  try {
    const {
      data: { data, errors },
    } = await axios.post<FetchApiResponse<AddPointsResult>>(
      todosEndpoint,
      query,
      axiosBaseConfig
    );

    if (errors) {
      return null;
    }

    return data.addPoints;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return console.error(
        'Service error trying to add points to the user => ',
        query,
        error.message,
        error
      );
    }

    console.error('Unexpected error trying to add points to the user => ', query, error);
  }
};
