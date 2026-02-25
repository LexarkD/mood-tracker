// Пример эндпоинтов.
// RTK Query ориентирована на предварительное объявление API эндпоинтов. Это подходит для генерации определений на основе внешних схем OpenAPI и GraphQL.
//инструменты - https://redux-toolkit.js.org/rtk-query/usage/code-generation.

import { baseApi } from './baseApi';

export const fakeMoodApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getFakeMoods: builder.query({
      query: () => 'moods',
    }),
    addFakeMood: builder.mutation({
      query: newMood => ({
        url: 'moods',
        method: 'POST',
        body: newMood,
      }),
    }),
  }),
});

// fake Хуки
export const { useGetFakeMoodsQuery, useAddFakeMoodMutation } = fakeMoodApi;
