import { createSlice } from '@reduxjs/toolkit'
import { forumInitialState } from './initialState'
import { getExtraReducers } from './extraReducers'
import { LoadStatus } from '@utils/store/enums'

export const forumSlice = createSlice({
    name: 'forum',
    initialState: forumInitialState,
    reducers: {
        updateTopicEmoji: (state, action) => {
            state.topicEmoji = action.payload
        },
        startLoading: state => {
            state.status = LoadStatus.loading
        },
    },
    selectors: {
        selectStatus: state => state.status,
        selectTopicsData: state => state.topicsData,
        selectError: state => state.error,
        selectTopicEmoji: state => state.topicEmoji,
        selectEmojis: state => state.emojis,
        selectEmojisByTopic: state => state.emojisByTopic,
    },
    extraReducers: getExtraReducers,
})

export const forumReducer = forumSlice.reducer
export const forumSelectors = forumSlice.selectors
export const forumActions = forumSlice.actions
