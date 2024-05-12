import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { LoadStatus } from '@utils/store/enums'
import { ForumState } from './types'
import { getEmoji, getReactions, getTopics } from './thunk'
import { keyBy } from 'lodash'
import { BaseAsyncCases } from '@utils/store/extraReducers'

class ForumAsyncCases extends BaseAsyncCases<ForumState> {
    fetchingTopics = () => {
        this.addCommonCase(getTopics).addCase(
            getTopics.fulfilled,
            (state, action) => {
                state.status = LoadStatus.complete
                state.topicsData = action.payload
            }
        )

        return this
    }

    fetchingEmojis = () => {
        this.addCommonCase(getEmoji).addCase(
            getEmoji.fulfilled,
            (state, action) => {
                state.status = LoadStatus.complete
                state.emojis = action.payload
                state.emojisByTopic = keyBy(action.payload, 'id')
            }
        )

        return this
    }

    fetchingReactions = () => {
        this.addCommonCase(getReactions).addCase(
            getReactions.fulfilled,
            (state, action) => {
                state.status = LoadStatus.complete
                state.topicEmoji = action.payload
            }
        )

        return this
    }
}

export const getExtraReducers = (
    builder: ActionReducerMapBuilder<ForumState>
) => {
    new ForumAsyncCases(builder)
        .fetchingTopics()
        .fetchingEmojis()
        .fetchingReactions()
}
