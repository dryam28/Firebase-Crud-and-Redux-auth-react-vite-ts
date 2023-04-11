import { createSlice } from '@reduxjs/toolkit';
import { extraReducers, reducers } from '../Reducers/authReducers';
import { IGatewayData } from '../../firebase/services';

export interface AuthState {
  isAuthenticated: boolean;
  uid: string | null | undefined;
  email: string | null | undefined;
  error: string | null;
  isLoading: boolean;
  isPageLoading: boolean;
  userData: IGatewayData[] | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  email: null,
  uid: null,
  error: null,
  isLoading: false,
  isPageLoading: true,
  userData: null,
};

const { login, signUp, checkUserSesion, logout } = extraReducers;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers,
  extraReducers: (builder) => {
    builder
      .addCase(logout.pending, (state, action) => {
        state.isPageLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isPageLoading = false;
        state.isAuthenticated = false;
        state.email = null;
        state.uid = null;
      })
      .addCase(checkUserSesion.fulfilled, (state, action) => {
        state.isPageLoading = false;

        if (action.payload instanceof Error) {
          state.error = action.payload.message;
          return;
        }

        if (!action.payload) {
          state.isAuthenticated = false;
          state.email = null;
          state.uid = null;
          state.userData = null;
          return;
        }
        state.uid = action.payload.uid;
        state.error = null;
        state.email = action.payload.email;
        state.isAuthenticated = !!(state.email && state.email.trim());
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload instanceof Error) {
          state.error = action.payload.message;
          return;
        }

        state.uid = action.payload.user.uid;
        state.email = action.payload.user.email;
        state.error = null;
        state.isAuthenticated = !!(state.email && state.email.trim());
      })
      .addCase(signUp.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload instanceof Error) {
          state.error = action.payload.message;
          return;
        }
        state.uid = action.payload.user.uid;
        state.email = action.payload.user.email;
        state.error = null;
        state.isAuthenticated = !!(state.email && state.email.trim());
      });
  },
});

export const { setEmail, setIsAuthenticated, setUserData } = authSlice.actions;
export { login, signUp, checkUserSesion, logout };
export default authSlice.reducer;
