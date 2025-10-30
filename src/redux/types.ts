import { store } from './store'

// Типы для всего store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch