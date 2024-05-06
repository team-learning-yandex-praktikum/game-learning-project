import { createSlice } from '@reduxjs/toolkit'
import { forumInitialState } from './initialState'
import { getExtraReducers } from './extraReducers'

export const forumSlice = createSlice({
    name: 'forum',
    initialState: forumInitialState,
    reducers: {},
    selectors: {
        selectStatus: state => state.status,
        selectTopicsData: state => state.topicsData,
        selectError: state => state.error,
    },
    extraReducers: getExtraReducers,
})

export const forumReducer = forumSlice.reducer
export const forumSelectors = forumSlice.selectors
export const forumActions = forumSlice.actions
