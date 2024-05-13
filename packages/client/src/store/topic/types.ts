import { EmojiDTO } from '@api/emoji/types'
import { ReactionDTO } from '@api/reaction/types'
import { BaseState } from '@utils/store/types'

export interface TopicComment {
    id: number
    topicId: number
    content: string
    createdBy: string
    createdAt: string
    parentId: number | null
}

export interface Topic {
    id: number
    title: string
    createdBy: string
    createdAt: string
    updatedAt: string
    comments: TopicComment[]
    description?: string
    emoji?: ReactionDTO[]
}

export interface TopicState extends BaseState {
    topicData?: Topic
    topicEmoji?: EmojiDTO
}
