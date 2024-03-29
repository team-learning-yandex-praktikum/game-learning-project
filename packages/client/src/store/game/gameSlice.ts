import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { gameInitialState } from './initialState'
import { STATUSES } from '@store/constants'

export const gameSlice = createSlice({
    name: 'game',
    initialState: gameInitialState,
    reducers: {
        startGame: state => {
            state.status = STATUSES.GAME
            state.score = 0
        },
        finishGame: (state, action: PayloadAction<number>) => {
            state.status = STATUSES.FINISH
            state.score = action.payload
        },
        resetGame: () => gameInitialState,
    },
    selectors: {
        selectStatus: state => state.status,
        selectScore: state => state.score,
    },
})

export const gameReducer = gameSlice.reducer
export const gameSelectors = gameSlice.selectors
export const gameActions = gameSlice.actions
