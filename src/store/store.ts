import { combineReducers, configureStore } from '@reduxjs/toolkit';
import moodListReducer from './moodListSlice.ts';
import { baseApi } from './api/baseApi.ts';
import {
  createTransform,
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
import AsyncStorage from '@react-native-async-storage/async-storage';

const reducers = combineReducers({
  moodList: moodListReducer,
  [baseApi.reducerPath]: baseApi.reducer, // была ошибка теперь тут поле 'api'
});

// Пробовал определить type RootState в этом месте, но определение RootState до store и persist не коректно
// export type RootState = ReturnType<typeof reducers>;

// createTransform тут ничего не делает. Оставил пока для экспериментов
const rtkQueryTransform = createTransform(
  (inboundState: any) => {
    return inboundState;
  },
  (outboundState: any) => {
    return outboundState;
  },
);

// Раньше пробовал PersistConfig<RootState>, но RootState теперь определяется ниже,
// поэтому для PersistConfig я создал тип type RootReducerState.
type RootReducerState = ReturnType<typeof reducers>;

const persistConfig: PersistConfig<RootReducerState> = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [rtkQueryTransform],
  whitelist: ['moodList'], // api не сохраняется
};

const persistedReducer = persistReducer(persistConfig, reducers); //создаю редюсер, обернутый в персист

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], //  Это команда для редакса, чтоб он игнорировал и не ругался на ряд
        //  действий которые персист вызывает у себя под копотом, когда обновляются данные в storage, либо при запуске приложения.
      },
    }).concat(baseApi.middleware),
});

// раньше опеределялся в App.tsx, теперь экспортируется туда
export const persistor = persistStore(store);

// type RootState теперь определяется после store, чтобы TypeScript сам вывел правильный тип (включая PersistPartial)
// Так же стейт после persist содержит дополнительное поле _persist.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

// было до persist+async-storage
// export const store = configureStore({
//   reducer: {
//     moodList: moodListReducer,
//   },
// });
