import { combineReducers, configureStore } from '@reduxjs/toolkit';
import moodListReducer from './moodListSlice.ts';
import { baseApi } from './api/baseApi.ts';
import {
  // createTransform,
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

// combineReducers создаёт комбинированный редюсер, в который входят кастомный редюсер -moodListReducer и редюсер RTK Query - [baseApi.reducerPath] (кэш api)
// combinedReducer будет управлять состоянием вида { moodList: ..., api: ..., }
const combinedReducer = combineReducers({
  moodList: moodListReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

// // createTransform тут ничего не делает. Оставил пока для экспериментов
// const rtkQueryTransform = createTransform(
//   (inboundState: any) => {
//     return inboundState;
//   },
//   (outboundState: any) => {
//     return outboundState;
//   },
// );

// PersistConfig принимает тип type RootReducerState- ожидает структуру состояния typeof combinedReducer
type RootReducerState = ReturnType<typeof combinedReducer>;

// Определяю конфигурацию для персист: ключ, хранилище будет AsyncStorage, способ трансформировать данные,
// так же только часть состояния под именем moodList должна сохраняться и восстанавливаться, а "api" - не сохраняется(RTK Query управляет кешем самостоятельно)
const persistConfig: PersistConfig<RootReducerState> = {
  key: 'root',
  storage: AsyncStorage,
  // transforms: [rtkQueryTransform],
  whitelist: ['moodList'],
};

// Мой комбинированный редюсер оборачиваю в персист, фактически - только редюсер moodList т.к. whitelist: ['moodList'] (см. persistConfig)
const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // Добавление промежуточного ПО API позволяет использовать кэширование, аннулирование, опрос и другие полезные функции `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Это команда для редакса, чтоб он игнорировал и не ругался на ряд действий которые персист вызывает у себя под копотом, когда обновляются данные в storage, либо при запуске приложения.
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      //  baseApi.middleware перехватывает действия (actions), связанные с запросами, управляет кэшированием, автоматически обновляет данные и т.д.
    }).concat(baseApi.middleware),
});

// // Эксперимента ради написал еще один вариант кода. Оба варианта валидны. Оставлю его тут для примера.
// // Смысл в том, что тут я НЕ применяю combineReducers() самостоятельно. persistReducer() я применяю только к moodListReducer.
// // А в store я передаю persistedMoodListReducer и [baseApi.reducerPath]: baseApi.reducer по отдельности.
// // configureStore() уже под капотом сам применяет combineReducers() к объекту редюсеров reducer:{ moodList: persistedMoodListReducer, [baseApi.reducerPath]: baseApi.reducer, },

// // PersistConfig принимает тип type RootReducerState- ожидает структуру состояния typeof moodListReducer
// type RootReducerState = ReturnType<typeof moodListReducer>;

// const persistConfig: PersistConfig<RootReducerState> = {
// // Название ключа другое - должно быть семантически понятным. Т.к. тут ключ подходит только для moodListReducer
//   key: 'moodList',
//   storage: AsyncStorage,
// // Убрал поле whitelist: ['moodList'], т.к. вместо combineReducers(), я использовал именно moodListReducer.
// };

// // Добавил персестивность только для moodListReducer
// const persistedMoodListReducer = persistReducer(persistConfig, moodListReducer);

// // Добавил отдельно персистированный moodListReducer и не персистированный [baseApi.reducerPath]: baseApi.reducer
// export const store = configureStore({
//   reducer: {
//     moodList: persistedMoodListReducer,
//     [baseApi.reducerPath]: baseApi.reducer,
//   },
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }).concat(baseApi.middleware),
// });

// Еще один интересный пример вложеной персистивности (дока - https://github.com/rt2zz/redux-persist?tab=readme-ov-file#nested-persists)

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

//Ранее я пытался определить type RootState до persistReducer. Это не сработало так как persist добавляет поле метаданных, имеющих встроенный тип PersistPartial.

// Cтруктура объекта состояния до persistReducer():
// {
//   moodList: {
//     moodList: [],
//   },
//   api: {
//     // поля RTK Query
//   },
// }
// Имеет type RootReducerState = ReturnType<typeof combinedReducer>, по сути - type RootReducerState = { moodList: MoodListState; api: ApiState }

// Cтруктура объекта состояния после persistReducer():
// {
//   moodList: {
//     moodList: [],
//   },
//   api: {
//     // поля RTK Query
//   },
//   _persist: {           // метаданные persisrt (значения примерные).
//     version: -1,
//     rehydrated: false
//   }
// }
// Имеет type PersistedState = RootReducerState & {
//   _persist: {
//     version: number;
//     rehydrated: boolean;
//   };
// };
// по сути - type PersistedState = RootReducerState & PersistPartial

//Теперь type RootState определяется после configureStore() и через ReturnType<typeof store.getState> получая типизацию финальной структуры объекта состояния
