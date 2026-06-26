import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store.ts';

// NOTE: MARK_OPTIONS является единой входной точкой для вариантов настроения и сна.
export const MARK_OPTIONS = {
  moodMark: ['great', 'happy', 'neutral', 'sad', 'awful'],
  sleepMark: ['cheerful', 'norm', 'sleepy'],
} as const;

// NOTE: получаю union-типы
export type MoodType = (typeof MARK_OPTIONS.moodMark)[number];
export type SleepType = (typeof MARK_OPTIONS.sleepMark)[number];

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
    addMockData: (state, action) => {
      state.markList = [...action.payload, ...state.markList];
    },
  },
});

export const { addMarkEntry, removeMarkEntry, clearMarkList, addMockData } =
  markListSlice.actions;

export const selectMarkList = (state: RootState): MarkEntryWithTimestamp[] =>
  state.markList.markList;

export default markListSlice.reducer;
