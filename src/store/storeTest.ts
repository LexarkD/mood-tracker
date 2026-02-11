import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appReducer from './slicesTest/appTestSlice.ts';
import { baseApi } from './apiTest/baseTestAPI.ts';
import {
  PAUSE,
  PersistConfig,
  FLUSH,
  REHYDRATE,
  PERSIST,
  PURGE,
  REGISTER,
  createTransform,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const reducers = combineReducers({
  app: appReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export type RootState = ReturnType<typeof reducers>;

const rtkQueryTransform = createTransform(
  (inboundState: any) => {
    //как должны трансформироваться данные при сохранении
    // return inboundState;
    return undefined; // можно вернуть undefined, тогда данные в оффлайн сохраняться не будут(то же что блэклист?)
  },
  (outboundState: any) => {
    // это функция отрабатывает, когда приложение запускается и данные должны попасть из оффлайн хранилища в состояние. Показывает, какая трансформация данных нужна при передаче данных в состояние.
    // тут могут быть какие-то проверки, в подходящем ли виде находятся данные.
    // return { ...outboundState, [baseApi.reducerPath]: undefined };
    return undefined; // тут так же можно вернуть undefined, тогда данные не будут вытаскиваться с оффлайн хранилища.
  },
  { whitelist: [baseApi.reducerPath] },
);

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage: AsyncStorage,
  //  blacklist: ['app'], // если допустим я не хочу, чтоб языковые настройки с sliceTest попадали в оффлайн хранилище
  //  blacklist: [baseApi.reducerPath], // если я не хочу, чтоб данные проходящие через RTKQuery попадали в оффлайн хранилище
  //  blacklist - необходим для тех редьюсеров(слайсов?), данные которых должны храниться в рамках одной сессии.
  transforms: [rtkQueryTransform], // transform принимает массив функций, которые обрабатывыают данные. Функцию см.выше.
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
  // devTools: process.env.NODE_ENV !=== 'production',   // что-то непонятное
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
