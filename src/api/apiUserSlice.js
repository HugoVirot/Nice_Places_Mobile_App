import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const apiUserSlice = createApi({
  reducerPath: 'apiUserSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://nice-places.fr/api',
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    logInUser: builder.query({
      query: () => '/users',
    }),
  }),
})
export const { useLogInUserQuery } = apiUserSlice