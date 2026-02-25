// По сути имеет структуру и логику slice Redux Toolkit
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// createApi() внутрии вызывает createSlice(). Так что по сути я имею дело с теми же экшенами а редюсерами.
export const baseApi = createApi({
  // reducerPath содержит значение -это уникальное имя, под которым состояние будет храниться в redux store.
  reducerPath: 'baseApi',
  // fetchBaseQuery() - обертка для стандартного fetch, с базовым функционалом
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/', //как правило используется один корневой Url и разное количество эндпоинтов для него.
    prepareHeaders: (headers, { getState }) => {
      //prepareHeaders: () => {} вызывается перед каждым запросом, получает заголовки и объект getState. getState может использоваться для доступа в хранилище Redux
      return headers;
    },
  }),
  endpoints: () => ({}),
});

//  В текущем виде приложения, файл baseApi.ts не выполняет никакого функционала. baseApi не имеет собственных эндпоинтов и не генерирует хуков.
//  baseApi.reducer добавлен в stor и отвечает за хранение состояния кэша, статусов запросов, ошибок и т.д. - там пока нет данных.

//  Это просто базовая структура подготовленная для расширения функционала. Это ядро RTK Query.
//  Кпримеру я могу "инжектить" эндпоинты в baseApi в других файлах (см. fakeApi.ts)
