import { ActionReducerMapBuilder, AsyncThunk } from '@reduxjs/toolkit'
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { LoadStatus } from '@store/enums'
import { ForumState } from './types'
import { getEmoji, getReactions, getTopics } from './thunk'
import _ from 'lodash'

class ForumAsyncCases {
    readonly builder: ActionReducerMapBuilder<ForumState>

    constructor(builder: ActionReducerMapBuilder<ForumState>) {
        this.builder = builder
    }

    private addCommonCase = <R, A>(
        thunk: AsyncThunk<R, A, AsyncThunkConfig>
    ) => {
        this.builder
            .addCase(thunk.pending, state => {
                state.status = LoadStatus.loading
            })
            .addCase(thunk.rejected, (state, action) => {
                state.status = LoadStatus.failed
                state.error = action.error.message
            })

        return this.builder
    }

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
                state.ixEmojis = _.keyBy(action.payload, 'id')
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
