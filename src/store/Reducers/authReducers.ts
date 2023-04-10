import { PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState } from '../slices/authSilce';
import {
  signUpWithCredentials,
  loginWithCredentials,
  logoutFirebase,
  checkAuthSession,
} from '../../firebase/services';
import { PropsRegister } from '../../firebase/services';

const setEmail = (
  state: AuthState,
  action: PayloadAction<{ email: string }>
) => {
  state.email = action.payload.email;
};

const setIsAuthenticated = (
  state: AuthState,
  action: PayloadAction<{ isAuthenticated: boolean }>
) => {
  state.isAuthenticated = action.payload.isAuthenticated;
};

const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ email, password }: PropsRegister) => {
    const res: any = await signUpWithCredentials({ email, password });
    return res;
  }
);

const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: PropsRegister) => {
    const res: any = await loginWithCredentials({ email, password });
    return res;
  }
);

const checkUserSesion = createAsyncThunk('auth/checkSession', async () => {
  const res = await checkAuthSession();
  return res;
});

const logout = createAsyncThunk('auth/logout', async () => {
    const res = await logoutFirebase();
    return res;
  });

export const reducers = {
  setEmail,
  setIsAuthenticated,
};

export const extraReducers = {
  login,
  signUp,
  checkUserSesion,
  logout
};
