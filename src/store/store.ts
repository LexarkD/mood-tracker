import { configureStore } from '@reduxjs/toolkit';
import testCounterReducer from '../testRedux/testSlice.ts';

export const store = configureStore({
  reducer: {
    testCounter: testCounterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
