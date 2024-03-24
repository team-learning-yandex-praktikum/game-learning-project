import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userReducer } from './user/userSlice'
import { settingsReducer } from './settings/settingsSlice'
import { sidebarReducer } from './sidebar/sidebarSlice'

const rootReducer = combineReducers({
    user: userReducer,
    settings: settingsReducer,
    sidebar: sidebarReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
