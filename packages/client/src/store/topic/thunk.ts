import { createAsyncThunk } from '@reduxjs/toolkit'
import { forumApi } from '@api'

export const getTopic = createAsyncThunk('forum/getTopic', forumApi.getTopic)

export const createTopic = createAsyncThunk(
    'forum/createTopic',
    forumApi.createTopic
)

export const createComment = createAsyncThunk(
    'forum/createComment',
    forumApi.createComment
)
