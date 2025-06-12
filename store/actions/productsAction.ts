import axios from 'axios';
import axiosApi from '../../axiosApi';
import { AppDispatch, RootState } from '../index';
import {
  addProduct,
  deleteProduct,
  fetchProductsFailure,
  fetchProductsRequest,
  fetchProductsSuccess,
  Product,
} from '../reducers/productsSlice';

export const fetchProductsAsync = () => async (dispatch: AppDispatch) => {
  dispatch(fetchProductsRequest());
  try {
    const response = await axiosApi.get<Product[]>('/products');
    dispatch(fetchProductsSuccess(response.data));
  } catch (error: unknown) {
    let errorMessage = 'Some error';
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data ? String(error.response.data) : error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    dispatch(fetchProductsFailure(errorMessage));
  }
};

export const createProductAsync =
  (productData: FormData) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(fetchProductsRequest());
    const token = getState().users.user?.token;

    try {
      const headers = token ? { Authorization: token } : {};
      const response = await axiosApi.post<Product>('/products', productData, { headers });
      dispatch(addProduct(response.data));
    } catch (error: unknown) {
      let errorMessage = 'Unknown error';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data ? String(error.response.data) : error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(fetchProductsFailure(errorMessage));
    }
  };

export const deleteProductAsync = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(fetchProductsRequest());
  try {
    await axiosApi.delete(`/products/${id}`);
    dispatch(deleteProduct(id));
  } catch (error: unknown) {
    let errorMessage = 'Unknown error';
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data ? String(error.response.data) : error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    dispatch(fetchProductsFailure(errorMessage));
  }
};
