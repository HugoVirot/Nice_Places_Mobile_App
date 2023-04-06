import { configureStore } from '@reduxjs/toolkit'  // pour déclarer un store avec redux-toolkit
import userReducer from './userSlice'
import lieuReducer from './lieuSlice'

export const store = configureStore(
  {
    reducer: {
      user :userReducer,
      lieu: lieuReducer
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),  // pour activer les redux devtools
  )

