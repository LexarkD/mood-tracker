import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store.ts';

interface CounterMoodState {
  value: number;
}

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

// Other code such as selectors can use the imported `RootState` type
// В другом коде, например, в селекторах, можно использовать импортированный тип `RootState`.
// ЗАЧЕМ????
export const selectCount = (state: RootState) => state.counter.value;

export default counterMoodSlice.reducer;
