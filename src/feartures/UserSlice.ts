import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { loginUserApi, getUserApi } from '../utils/burger-api';

export const ROLE = {
  ADMIN: 'admin',
  USER: 'user',
  GENERAL: ['admin', 'user']
} as const;

export const loginUserThunk = createAsyncThunk(
  'users/loginUser',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await loginUserApi({ email, password });
    localStorage.setItem('token', response.accessToken);
    return response.user;
  }
);

export const getUserThunk = createAsyncThunk('users/getUser', async () => {
  const response = await getUserApi();
  return response.user;
});

export interface IUserState {
  accessToken: string | null;
  isInit: boolean;
  isLoading: boolean;
  user: TUser | null;
  error: string | null;
  canResetPassword: boolean;
}

const initialState: IUserState = {
  accessToken: null,
  isInit: false,
  isLoading: false,
  user: null,
  error: null,
  canResetPassword: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    init: (state) => {
      state.isInit = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to login';
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    });

    builder.addCase(getUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserThunk.rejected, (state, action) => {
      state.isInit = true;
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch user';
    });
    builder.addCase(getUserThunk.fulfilled, (state, action) => {
      state.isInit = true;
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    });
  }
});

export const { init } = userSlice.actions;

export default userSlice.reducer;
