import { createAsyncThunk } from '@reduxjs/toolkit'

import { forumApi } from '@api'
import { reactionApi } from '@api/reaction'
import { emojiApi } from '@api/emoji'

export const getTopics = createAsyncThunk('forum/getTopics', forumApi.getTopics)

export const getEmoji = createAsyncThunk('reaction/getEmoji', emojiApi.getEmoji)
export const getReactions = createAsyncThunk(
    'reaction/getReactions',
    reactionApi.getReactions
)
