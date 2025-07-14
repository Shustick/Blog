import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { registerAPI, loginAPI, getCurrentUserAPI } from './authApi';
import { updateProfileAPI } from './authApi';
import type { IUser, IAuthResponse } from './authType';

interface AuthState {
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

// регистрация
export const registerUser = createAsyncThunk<IAuthResponse, { username: string; email: string; password: string }>(
  'auth/register',
  async (userData) => {
    return registerAPI(userData);
  }
);

// логин
export const loginUser = createAsyncThunk<IAuthResponse, { email: string; password: string }>(
  'auth/login',
  async (userData) => {
    return loginAPI(userData);
  }
);

// получить текущего юзера при старте
export const getCurrentUser = createAsyncThunk<IAuthResponse, string>('auth/getCurrentUser', async (token) => {
  return getCurrentUserAPI(token);
});

// обновление профиля
export const updateUser = createAsyncThunk<
  IAuthResponse,
  { email: string; username: string; password?: string; image?: string; bio?: string },
  { state: { auth: AuthState } }
>('auth/updateUser', async (userData, { getState }) => {
  const token = getState().auth.user?.token;
  if (!token) {
    throw new Error('Token not found');
  }
  return updateProfileAPI(userData, token);
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.user.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка регистрации';
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.user.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка входа';
      })

      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка обновления профиля';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
