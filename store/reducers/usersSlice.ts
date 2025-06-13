import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface User {
  username: string;
  email?: string;
  _id: string;
  token: string | null;
  role: string;
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
    registerUserSuccess(state) {
      state.loading = false;
      state.registered = true;
      state.error = null;
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
} = usersSlice.actions;

export default usersSlice.reducer;
