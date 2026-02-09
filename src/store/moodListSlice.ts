import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store.ts';
import _ from 'lodash';

export type Mood = {
  emoji: string;
  description: string;
};

export type MoodWithTimestamp = Mood & {
  timestamp: number;
};

type MoodListState = {
  moodList: MoodWithTimestamp[];
};

const initialState: MoodListState = {
  moodList: [],
};

export const moodListSlice = createSlice({
  name: 'moodList',
  initialState,
  reducers: {
    addMood: {
      reducer: (state, action: PayloadAction<MoodWithTimestamp>) => {
        state.moodList = [action.payload, ...state.moodList];
      },
      prepare: mood => {
        return {
          payload: { ...mood, timestamp: Date.now() },
        };
      },
    },

    removeMood: (state, action) => {
      state.moodList = state.moodList.filter(
        mood => mood.timestamp !== action.payload,
      );
    },

    clearMoods: state => {
      state.moodList = [];
    },
  },
});

export const { addMood, removeMood, clearMoods } = moodListSlice.actions;

export const selectMoodList = (state: RootState) => state.moodList.moodList;

export default moodListSlice.reducer;
