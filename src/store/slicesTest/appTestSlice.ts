import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppState } from 'react-native';

// enum - это набор логически связанных констант, в качестве значений которых могут выступать как числа, так и строки. Кпримеру во избежание магических чисел.
// Обращение - Langs.EN или Langs.RU
export enum Langs {
  EN = 'en',
  RU = 'ru',
}

export type appState = {
  lang: Langs; // грубо говоря => lang: 'en' | 'ru';
};

const initialState: appState = {
  lang: Langs.EN, // грубо говоря => lang: 'en',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateAppSettings: (state: appState, action: PayloadAction<appState>) => {
      const { lang } = action.payload;
      state.lang = lang;
    },
  },
});

export const { updateAppSettings } = appSlice.actions;

export const selectAppSettings = (state: { app: AppState }): AppState =>
  state.app;

export default appSlice.reducer;
