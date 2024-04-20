import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userReducer } from './user/userSlice'
import { settingsReducer } from './settings/settingsSlice'
import { sidebarReducer } from './sidebar/sidebarSlice'
import { gameReducer } from './game'
import { getWindow } from '@utils/document'
import { ssrReducer } from './ssr/ssrSlice'
import { leaderboardReducer } from './leaderboard/leaderboardSlice'

declare global {
    interface Window {
        initialState?: RootState
    }
}

export const reducer = combineReducers({
    user: userReducer,
    settings: settingsReducer,
    sidebar: sidebarReducer,
    game: gameReducer,
    ssr: ssrReducer,
    leaderboard: leaderboardReducer,
})

export const createStore = () => {
    const initialState = getWindow()?.initialState
    delete getWindow()?.initialState

    return configureStore({
        reducer: reducer,
        preloadedState: initialState,
    })
}

export const store = createStore()

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
