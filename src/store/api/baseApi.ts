import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// NOTE: Пока что оставлю Api RTKQuery, в будущем будет фича с статистикой погодной зависимости
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
  }),
  endpoints: () => ({}),
});
