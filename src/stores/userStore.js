import { configureStore } from '@reduxjs/toolkit'  // pour déclarer un store avec redux-toolkit
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiUserSlice } from '../api/apiSlice'


export const userStore = configureStore({
  reducer: {
    [apiUserSlice.reducerPath]: apiUserSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiUserSlice.middleware),
})

setupListeners(userStore.dispatch)