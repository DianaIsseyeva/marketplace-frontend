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
  setCart,
  toggleFavorite,
  type CartItem,
} from '../reducers/usersSlice';
export interface User {
  username: string;
  email?: string;
  password: string;
}

export const registerUserAsync = (userData: User) => async (dispatch: AppDispatch) => {
  dispatch(registerUserRequest());
  try {
    const response = await axiosApi.post('/users', userData);
    dispatch(registerUserSuccess(response.data));
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

export const toggleFavoriteAsync =
  (productId: string, navigate: (path: string) => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const user = getState().users.user;
    if (!user || !user.token) {
      navigate('/login');
      return;
    }
    const method = user.favorites.includes(productId) ? 'delete' : 'post';
    try {
      const data = {
        userId: user._id,
      };
      await axios({
        method,
        url: `http://localhost:8000/favorites/${productId}`,
        data,
      });
      dispatch(toggleFavorite(productId));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errMsg = error.response?.data?.message || error.message;
        if (errMsg.includes('jwt expired')) {
          alert('Сессия истекла. Пожалуйста, авторизуйтесь еще раз.');
          dispatch(logoutUserAsync());
          localStorage.removeItem('state');
          return;
        }
        alert(`Ошибка: ${errMsg}`);
      } else {
        console.error(error);
      }
    }
  };

export const handleAddToCartAsync =
  (productId: string, quantity: number, navigate: (path: string) => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const user = state.users.user;
    if (!user || !user.token) {
      navigate('/login');
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8000/cart/${productId}`,
        { quantity },
        { headers: { Authorization: user.token } }
      );
      const newCart: CartItem[] = response.data.cart;
      dispatch(setCart(newCart));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errMsg = error.response?.data?.message || error.message;
        if (errMsg.includes('jwt expired')) {
          alert('Сессия истекла. Пожалуйста, авторизуйтесь еще раз.');
          dispatch(logoutUserAsync());
          localStorage.removeItem('state');
          return;
        }
        alert(`Ошибка: ${errMsg}`);
      } else {
        console.error(error);
      }
    }
  };

export const removeFromCartAsync =
  (productId: string, navigate: (path: string) => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const user = getState().users.user;
    if (!user || !user.token) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8000/cart/${productId}`, {
        headers: { Authorization: user.token },
      });

      const updatedCart: CartItem[] = response.data.cart;
      dispatch(setCart(updatedCart));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errMsg = error.response?.data?.message || error.message;
        if (errMsg.includes('jwt expired')) {
          alert('Сессия истекла. Пожалуйста, авторизуйтесь еще раз.');
          dispatch(logoutUserAsync());
          localStorage.removeItem('state');
          return;
        }
        alert(`Ошибка: ${errMsg}`);
      } else {
        console.error(error);
      }
    }
  };
