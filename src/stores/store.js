// This creates a Redux store, and also automatically configure the Redux DevTools 
// extension so that you can inspect the store while developing.

import { configureStore } from '@reduxjs/toolkit'  // pour déclarer un store avec redux-toolkit
// Add Slice Reducers to the Store
import counterReducer from '../features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer, // Add Slice Reducers to the Store
  },
})