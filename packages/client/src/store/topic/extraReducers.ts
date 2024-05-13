import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { TopicState } from './types'
import { addReaction, createComment, createTopic, getTopic } from './thunk'
import { BaseAsyncCases } from '@utils/store/extraReducers'
import { LoadStatus } from '@utils/store/enums'

class TopicAsyncCases extends BaseAsyncCases<TopicState> {
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

    addReaction = () => {
        this.addCommonCase(addReaction).addCase(
            addReaction.fulfilled,
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
        .addReaction()
}
