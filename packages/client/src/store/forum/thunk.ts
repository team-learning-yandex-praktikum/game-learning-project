import { createAsyncThunk } from '@reduxjs/toolkit'
import { forumApi } from '@api'
import { reactionApi } from '@api/reaction'
import { emojiApi } from '@api/emoji'

export const getEmoji = createAsyncThunk('reaction/getEmoji', emojiApi.getEmoji)
export const getReactions = createAsyncThunk(
    'reaction/getReactions',
    reactionApi.getReactions
)

export const getTopics = createAsyncThunk(
    'forum/getTopics',
    async (_, { dispatch }) => {
        const response = await forumApi.getTopics({ limit: 20 })
        const topicIds = response.map(topic => topic.id)

        if (topicIds && topicIds.length > 0) {
            dispatch(getReactions(topicIds))
        }
        dispatch(getEmoji())

        return response
    }
)
