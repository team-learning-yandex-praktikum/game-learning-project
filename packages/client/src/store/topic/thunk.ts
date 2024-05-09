import { createAsyncThunk } from '@reduxjs/toolkit'
import { forumApi } from '@api'
import { CreateTopicDTO } from '@api/forum/types'
import { RootState } from '@store'

export const getTopic = createAsyncThunk('forum/getTopic', forumApi.getTopic)

export type CreateTopicData = Omit<CreateTopicDTO, 'createdBy'>

export const createTopic = createAsyncThunk(
    'forum/createTopic',
    async (creationData: CreateTopicData, { getState }) => {
        const login = (getState() as RootState).user.data.login
        if (!login) {
            throw new Error('User login is not exist')
        }
        const requestData: CreateTopicDTO = {
            ...creationData,
            createdBy: login,
        }
        await forumApi.createTopic(requestData)
    }
)

export const createComment = createAsyncThunk(
    'forum/createComment',
    forumApi.createComment
)
