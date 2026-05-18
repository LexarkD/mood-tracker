import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store.ts';

// NOTE: moodOptions является единой входной точкой для для вариантов настроения и его типизации.
export const moodOptions = [
  'awesome',
  'happy',
  'neutral',
  'sad',
  'terrible',
] as const;
export type MoodType = (typeof moodOptions)[number];

// NOTE: sleepOptions является единой входной точкой для для вариантов качества сна и его типизации.
export const sleepOptions = ['cheerful', 'norm', 'sleepy'] as const;
export type SleepType = (typeof sleepOptions)[number];

export type MarkEntryType = {
  moodMark: MoodType;
  sleepMark: SleepType;
};

export type TimeStamp = number;

export type MarkEntryWithTimestamp = { timestamp: TimeStamp } & MarkEntryType;

export type MarkListState = {
  markList: MarkEntryWithTimestamp[];
};

const initialState: MarkListState = {
  markList: [],
};

export const markListSlice = createSlice({
  name: 'markList',
  initialState,
  reducers: {
    addMarkEntry: {
      reducer: (state, action: PayloadAction<MarkEntryWithTimestamp>) => {
        state.markList = [action.payload, ...state.markList];
      },
      // NOTE: запись с отметками получает поле timestamp
      prepare: (markEntry: MarkEntryType) => {
        return {
          payload: { ...markEntry, timestamp: Date.now() },
        };
      },
    },

    removeMarkEntry: (state, action: PayloadAction<TimeStamp>) => {
      state.markList = state.markList.filter(
        markEntry => markEntry.timestamp !== action.payload,
      );
    },

    clearMarkList: state => {
      state.markList = [];
    },
  },
});

export const { addMarkEntry, removeMarkEntry, clearMarkList } =
  markListSlice.actions;

export const selectMarkList = (state: RootState): MarkEntryWithTimestamp[] =>
  state.markList.markList;

export default markListSlice.reducer;
