import axios from 'axios';
import axiosApi from '../../axiosApi';
import type { AppDispatch, RootState } from '../index';
import {
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
  logoutUser,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess,
} from '../reducers/usersSlice';
export interface User {
  username: string;
  email?: string;
  password: string;
}

export const registerUserAsync = (userData: User) => async (dispatch: AppDispatch) => {
  dispatch(registerUserRequest());
  try {
    await axiosApi.post('/users', userData);
    dispatch(registerUserSuccess());
  } catch (error) {
    let errorMessage = 'Some error';
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data ? String(error.response.data) : error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    dispatch(registerUserFailure(errorMessage));
  }
};

export const loginUserAsync = (userData: User) => async (dispatch: AppDispatch) => {
  dispatch(loginUserRequest());
  try {
    const { data } = await axiosApi.post('/users/sessions', userData);
    dispatch(loginUserSuccess(data.user));
  } catch (error) {
    let errorMessage = 'Some error';
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data ? String(error.response.data) : error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    dispatch(loginUserFailure(errorMessage));
  }
};

export const logoutUserAsync = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const token = getState().users.user?.token;
  try {
    const headers = token ? { Authorization: token } : {};
    await axiosApi.delete('/users/sessions', { headers });
  } catch (error) {
    console.warn('Ошибка при серверном logout', error);
  }
  dispatch(logoutUser());
};
