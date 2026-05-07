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

export const sleepOptions = ['cheerful', 'norm', 'sleepy'] as const;
export type SleepType = (typeof sleepOptions)[number];

export type MarkEntryType = {
  // description: MoodType;
  moodOptions: MoodType;
  sleepOptions: SleepType;
};

export type TimeStamp = number;

export type EntryMarkWithTimestamp = { timestamp: TimeStamp } & MarkEntryType;

export type MarkListState = {
  markList: EntryMarkWithTimestamp[];
};

const initialState: MarkListState = {
  markList: [],
};

export const markListSlice = createSlice({
  //TODO: сменить name: 'moodList' => name: 'markList'
  name: 'markList',
  initialState,
  reducers: {
    addMark: {
      reducer: (state, action: PayloadAction<EntryMarkWithTimestamp>) => {
        state.markList = [action.payload, ...state.markList];
      },
      prepare: (mark: MarkEntryType) => {
        return {
          payload: { ...mark, timestamp: Date.now() },
        };
      },
    },

    removeMark: (state, action: PayloadAction<TimeStamp>) => {
      state.markList = state.markList.filter(
        markEntry => markEntry.timestamp !== action.payload,
      );
    },

    clearMarkList: state => {
      state.markList = [];
    },
  },
});

export const { addMark, removeMark, clearMarkList } = markListSlice.actions;

export const selectMarkList = (state: RootState): EntryMarkWithTimestamp[] =>
  state.markList.markList;

export default markListSlice.reducer;
