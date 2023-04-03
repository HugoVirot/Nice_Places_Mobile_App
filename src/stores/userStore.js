import { configureStore } from '@reduxjs/toolkit'  // pour déclarer un store avec redux-toolkit
import userReducer from './userSlice'

export const userStore = configureStore(
  {
    reducer: {
      user :userReducer
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),  // pour activer les redux devtools
  )

