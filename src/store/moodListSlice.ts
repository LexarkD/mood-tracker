import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store.ts';

export type MoodType = {
  emoji: string;
  description: string;
};

export type TimeStamp = number;

export type MoodWithTimestamp = MoodType & { timestamp: TimeStamp };

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

// Указание типа MoodWithTimestamp[] технически является необязательным т.к. typeScript выведет этот тип автоматически через type RootState = ReturnType<typeof store.getState>(store.ts). Оставил его для читаемости кода.
export const selectMoodList = (state: RootState): MoodWithTimestamp[] =>
  state.moodList.moodList;

export default moodListSlice.reducer;
