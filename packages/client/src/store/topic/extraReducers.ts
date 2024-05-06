import { ActionReducerMapBuilder, AsyncThunk } from '@reduxjs/toolkit'
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { LoadStatus } from '@store/enums'
import { TopicState } from './types'
import { getTopic, createTopic, createComment } from './thunk'

class TopicAsyncCases {
    readonly builder: ActionReducerMapBuilder<TopicState>

    constructor(builder: ActionReducerMapBuilder<TopicState>) {
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

    fetchingTopic = () => {
        this.addCommonCase(getTopic).addCase(
            getTopic.fulfilled,
            (state, action) => {
                state.status = LoadStatus.complete
                state.topicData = action.payload
            }
        )

        return this
    }

    creationTopic = () => {
        this.addCommonCase(createTopic).addCase(
            createTopic.fulfilled,
            state => {
                state.status = LoadStatus.complete
            }
        )

        return this
    }

    creationComment = () => {
        this.addCommonCase(createComment).addCase(
            createComment.fulfilled,
            state => {
                state.status = LoadStatus.complete
            }
        )

        return this
    }
}

export const getExtraReducers = (
    builder: ActionReducerMapBuilder<TopicState>
) => {
    new TopicAsyncCases(builder)
        .fetchingTopic()
        .creationTopic()
        .creationComment()
}
