import { configureStore } from '@reduxjs/toolkit';
import authSilce from './slices/authSilce';

const store = configureStore({
  reducer: { auth: authSilce },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
