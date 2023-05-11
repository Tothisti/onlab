import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import authSlice from '../features/authSlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'
import { useDispatch } from 'react-redux'
import dashboardSlice from '../features/dashboardSlice'
import kitCartMaintanceSlice from '../features/kitCartMaintanceSlice'

// for redux-persist error in console
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['login']
}

const authPersistConfig = {
  key: 'login',
  storage,
  blacklist: ['status']
}

const rootReducer = combineReducers({
  login: persistReducer(authPersistConfig, authSlice),
  dashboard: dashboardSlice,
  kitCartMaintance: kitCartMaintanceSlice
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: customizedMiddleware
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch<AppDispatch>
