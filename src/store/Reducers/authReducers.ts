import { PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState } from '../slices/authSilce';
import {
  signUpWithCredentials,
  loginWithCredentials,
  logoutFirebase,
  checkAuthSession,
  IGatewayData,
} from '../../firebase/services';
import { PropsRegister } from '../../firebase/services';

const setEmail = (
  state: AuthState,
  action: PayloadAction<{ email: string }>
) => {
  state.email = action.payload.email;
};

const setAuthError = (
  state: AuthState,
  action: PayloadAction<{ msg: string }>
) => {
  state.error = action.payload.msg;
};

const setIsAuthenticated = (
  state: AuthState,
  action: PayloadAction<{ isAuthenticated: boolean }>
) => {
  state.isAuthenticated = action.payload.isAuthenticated;
};

const setUserData = (
  state: AuthState,
  action: PayloadAction<{ userData: IGatewayData[] }>
) => {
  state.userData = action.payload.userData;
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
  setUserData,
  setAuthError,
};

export const extraReducers = {
  login,
  signUp,
  checkUserSesion,
  logout,
};
