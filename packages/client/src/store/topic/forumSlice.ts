import { createSlice } from '@reduxjs/toolkit'
import { topicInitialState } from './initialState'
import { getExtraReducers } from './extraReducers'

export const topicSlice = createSlice({
    name: 'topic',
    initialState: topicInitialState,
    reducers: {},
    selectors: {
        selectStatus: state => state.status,
        selectTopicData: state => state.topicData,
        selectError: state => state.error,
    },
    extraReducers: getExtraReducers,
})

export const topicReducer = topicSlice.reducer
export const topicSelectors = topicSlice.selectors
export const topicActions = topicSlice.actions
