import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { leaderboardInitialState } from './initialState'
import { LeaderboardTable } from '@api/leaderBoard/types'
import { getExtraReducers } from './extraReducers'

export const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState: leaderboardInitialState,
    reducers: {
        setData: (state, action: PayloadAction<LeaderboardTable[]>) => {
            state.data = action.payload
        },
        incrementCursor: state => {
            state.cursor += 20
        },
    },
    selectors: {
        selectStatus: state => state.status,
        selectData: state => state.data,
        selectError: state => state.error,
        selectHasMoreDate: state => state.hasMoreData,
        selectCursor: state => state.cursor,
    },
    extraReducers: getExtraReducers,
})

export const leaderboardReducer = leaderboardSlice.reducer
export const leaderboardSelectors = leaderboardSlice.selectors
export const leaderboardActions = leaderboardSlice.actions
