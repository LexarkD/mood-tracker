import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store/store.ts';

type CounterMoodState = {
  value: number;
};

const initialState: CounterMoodState = {
  value: 0,
};

export const counterMoodSlice = createSlice({
  name: 'counterMood',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } =
  counterMoodSlice.actions;

export const selectCount = (state: RootState) => state.testCounter.value;

export default counterMoodSlice.reducer;
