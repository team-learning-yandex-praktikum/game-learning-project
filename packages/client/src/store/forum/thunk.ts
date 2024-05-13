import { createAsyncThunk } from '@reduxjs/toolkit'
import { topicsApi } from '@api'
import { reactionApi } from '@api/reaction'
import { emojiApi } from '@api/emoji'
import { TopicsGetParams } from '@api/topics/types'

export const getEmoji = createAsyncThunk('reaction/getEmoji', emojiApi.getEmoji)
export const getReactions = createAsyncThunk(
    'reaction/getReactions',
    reactionApi.getReactions
)

export const getTopics = createAsyncThunk(
    'forum/getTopics',
    async (params: TopicsGetParams, { dispatch }) => {
        const response = await topicsApi.getTopics(params)
        const topicIds = response.map(topic => topic.id)

        if (topicIds && topicIds.length > 0) {
            dispatch(getReactions(topicIds))
        }
        dispatch(getEmoji())

        return response
    }
)
