import { combineReducers, configureStore } from '@reduxjs/toolkit';
import moodListReducer from './slices/moodListSlice.ts';
import { baseApi } from './api/baseApi.ts';
import {
  PersistConfig,
  persistReducer,
  PAUSE,
  FLUSH,
  REHYDRATE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from 'redux-persist';
import { STORAGE_KEY } from '../constants/storageKey.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const combinedReducer = combineReducers({
  moodList: moodListReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

type RootReducerState = ReturnType<typeof combinedReducer>;

const persistConfig: PersistConfig<RootReducerState> = {
  key: STORAGE_KEY,
  storage: AsyncStorage,
  whitelist: ['moodList'],
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
