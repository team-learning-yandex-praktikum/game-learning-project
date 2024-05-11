import { createAsyncThunk } from '@reduxjs/toolkit'
import { forumApi } from '@api'
import { CreateTopicDTO } from '@api/forum/types'
import { RootState } from '@store'
import { addReactionParams } from '@api/reaction/types'
import { reactionApi } from '@api/reaction'
import { forumActions } from '@store/forum'

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

export const addReaction = createAsyncThunk(
    'reaction/addReaction',
    async (data: addReactionParams, { dispatch, getState }) => {
        const topicEmoji = (getState() as RootState).forum.topicEmoji
        const { userId, topicId, emojiId } = data
        const response = await reactionApi.addReaction(data)
        if (
            topicEmoji &&
            topicEmoji[topicId]?.find(el => el.userId === userId)
        ) {
            const updatedTopicEmoji = topicEmoji[topicId].map(el => {
                if (el.userId === userId) {
                    return { ...el, emojiId: emojiId }
                } else {
                    return el
                }
            })

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
            const updatedTopicEmoji =
                topicEmoji && topicEmoji[topicId]
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
