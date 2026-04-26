import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store.ts';

export const moodOptions = [
  'awesome',
  'happy',
  'neutral',
  'sad',
  'terrible',
] as const;
export type MoodType = (typeof moodOptions)[number];

export type TimeStamp = number;

export type MoodWithTimestamp = {
  description: MoodType;
  timestamp: TimeStamp;
};

export type MoodListState = {
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
      prepare: (mood: MoodType) => {
        return {
          payload: { description: mood, timestamp: Date.now() },
        };
      },
    },

    removeMood: (state, action: PayloadAction<TimeStamp>) => {
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

export const selectMoodList = (state: RootState): MoodWithTimestamp[] =>
  state.moodList.moodList;

export default moodListSlice.reducer;
