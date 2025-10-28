import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import dataReducer from './features/language/dataSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    data: dataReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch