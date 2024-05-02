import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userReducer } from './user/userSlice'
import { settingsReducer } from './settings/settingsSlice'
import { sidebarReducer } from './sidebar/sidebarSlice'
import { gameReducer } from '@store/game/gameSlice'
import { getWindow } from '@utils/document'
import { ssrReducer } from './ssr/ssrSlice'
import { leaderboardReducer } from './leaderboard/leaderboardSlice'
import { forumReducer } from '@store/forum/forumSlice'
import { topicReducer } from '@store/topic/forumSlice'

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
    leaderboard: leaderboardReducer,
    ssr: ssrReducer,
    forum: forumReducer,
    topic: topicReducer,
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
