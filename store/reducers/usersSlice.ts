import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  product: string;
  quantity: number;
  _id: string;
}
export interface User {
  username: string;
  email?: string;
  _id: string;
  token: string | null;
  role: string;
  favorites: string[];
  cart: CartItem[];
}
export interface UserState {
  registered: boolean;
  loading: boolean;
  error: string | null; // register error
  user: User | null;
  loginError: string | null;
}

const initialState: UserState = {
  registered: false,
  loading: false,
  error: null,
  user: null,
  loginError: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    registerUserRequest(state) {
      state.loading = true;
      state.error = null;
      state.registered = false;
    },
    registerUserSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.registered = true;
      state.error = null;
      state.user = action.payload;
    },
    registerUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.registered = false;
      state.error = action.payload;
    },
    //LOGIN
    loginUserRequest(state) {
      state.loading = true;
      state.loginError = null;
    },
    loginUserSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.user = action.payload;
    },
    loginUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.loginError = action.payload;
    },
    logoutUser(state) {
      state.user = null;
      state.registered = false;
    },
    toggleFavorite(state, action: PayloadAction<string>) {
      if (state.user) {
        const id = action.payload;
        const index = state.user.favorites.indexOf(id);
        if (index === -1) {
          state.user.favorites.push(id);
        } else {
          state.user.favorites.splice(index, 1);
        }
      }
    },
    setCart(state, action: PayloadAction<CartItem[]>) {
      if (state.user) {
        state.user.cart = action.payload;
      }
    },
    clearCart(state) {
      if (state.user) {
        state.user.cart = [];
      }
    },
  },
});

export const {
  registerUserRequest,
  registerUserSuccess,
  registerUserFailure,
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
  logoutUser,
  toggleFavorite,
  setCart,
  clearCart,
} = usersSlice.actions;

export default usersSlice.reducer;
