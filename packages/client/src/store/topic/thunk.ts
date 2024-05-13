import { createAsyncThunk } from '@reduxjs/toolkit'
import { topicsApi } from '@api'
import { CreateTopicDTO } from '@api/topics/types'
import { RootState } from '@store'
import { addReactionParams } from '@api/reaction/types'
import { reactionApi } from '@api/reaction'
import { forumActions } from '@store/forum'
import { commentsApi } from '@api/comments'
import { CreateCommentDTO } from '@api/comments/types'

export const getTopic = createAsyncThunk('forum/getTopic', topicsApi.getTopic)

export type CreateTopicData = Omit<CreateTopicDTO, 'createdBy'>
export type CreateCommentData = Omit<CreateCommentDTO, 'createdBy'>

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
        await topicsApi.createTopic(requestData)
    }
)

export const createComment = createAsyncThunk(
    'forum/createComment',
    async (creationData: CreateCommentData, { dispatch, getState }) => {
        const login = (getState() as RootState).user.data.login

        if (!login) {
            throw new Error('User login is not exist')
        }

        const response = await commentsApi.createComment({
            ...creationData,
            createdBy: login,
        })

        dispatch(getTopic(String(creationData.topicId)))

        return response
    }
)

export const addReaction = createAsyncThunk(
    'reaction/addReaction',
    async (data: addReactionParams, { dispatch, getState }) => {
        const topicEmoji = (getState() as RootState).forum.topicEmoji
        const { userId, topicId, emojiId } = data
        const response = await reactionApi.addReaction(data)
        if (topicEmoji?.[topicId]?.find(el => el.userId === userId)) {
            const updatedTopicEmoji = topicEmoji[topicId].map(el =>
                el.userId === userId ? { ...el, emojiId: emojiId } : el
            )

            const newTopicEmoji = {
                ...topicEmoji,
                [topicId]: updatedTopicEmoji,
            }
            dispatch(forumActions.updateTopicEmoji(newTopicEmoji))
        } else {
            const newReaction: addReactionParams = {
                userId: userId,
                emojiId: emojiId,
                topicId: topicId,
            }
            const updatedTopicEmoji = topicEmoji?.[topicId]
                ? [...topicEmoji[topicId], newReaction]
                : [newReaction]
            const newTopicEmoji = {
                ...topicEmoji,
                [topicId]: updatedTopicEmoji,
            }
            dispatch(forumActions.updateTopicEmoji(newTopicEmoji))
        }
        return response
    }
)
