import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store.ts';
import type { Mood } from './moodListSlice.ts';
import _ from 'lodash';

type MoodPickerUIState = {
  selectedOptionUI: undefined | Mood;
  hasSelectedOptionUI: boolean;
};

const initialState: MoodPickerUIState = {
  selectedOptionUI: undefined,
  hasSelectedOptionUI: false,
};

export const moodPickerUISlice = createSlice({
  name: 'moodPickerUI',
  initialState,
  reducers: {
    setSelectedMoodUI: (state, action) => {
      state.selectedOptionUI = action.payload;
    },
    setHasSelectedUI: (state, action) => {
      state.hasSelectedOptionUI = action.payload;
    },
  },
});

export const { setSelectedMoodUI, setHasSelectedUI } =
  moodPickerUISlice.actions;

export const selectSelectedOptionUI = (state: RootState) =>
  state.moodPickerUI.selectedOptionUI;
export const selectHasSelectedOptionUI = (state: RootState) =>
  state.moodPickerUI.hasSelectedOptionUI;

export default moodPickerUISlice.reducer;
