import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store.ts';

export type MoodType = {
  emoji: string;
  description: string;
};

//Добавил тип, чтоб указать его в removeMood - PayloadAction
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
      reducer: (
        state: MoodListState,
        action: PayloadAction<MoodWithTimestamp>,
      ) => {
        state.moodList = [action.payload, ...(state.moodList || [])];
        //пришлось отдельно указать возможность пустого массива, хотя выше уже было указано
        // в initialState. Откуда была эта трабла??
      },
      prepare: mood => {
        return {
          payload: { ...mood, timestamp: Date.now() },
        };
      },
    },

    removeMood: (state: MoodListState, action: PayloadAction<TimeStamp>) => {
      state.moodList = state.moodList.filter(
        mood => mood.timestamp !== action.payload,
      );
    },

    clearMoods: (state: MoodListState) => {
      state.moodList = [];
    },
  },
});

export const { addMood, removeMood, clearMoods } = moodListSlice.actions;

//мой прошлый вариант объявления селектора
//export const selectMoodList = (state: RootState) => state.moodList.moodList;

//зачем тут указание MoodWithTimestamp[]?
export const selectMoodList = (state: RootState): MoodWithTimestamp[] =>
  state.moodList?.moodList ?? []; //пришлось добавить вариант, если массив пустой

//Пытался объявить селектор, по примеру из курса. Он не работает, но я хочу понять почему
// export const selectMoodList = (state: {
//   moodList: MoodListState;
// }): MoodListState['moodList'] => state.moodList.moodList;

export default moodListSlice.reducer;
