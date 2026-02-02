import { configureStore } from '@reduxjs/toolkit';
import counterMoodReducer from './moodSlice';

export const store = configureStore({
  reducer: {
    counter: counterMoodReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
