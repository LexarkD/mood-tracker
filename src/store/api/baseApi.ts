import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// TODO: убрать baseApi, так как функционал, используюший backend, добавляться не будет
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
