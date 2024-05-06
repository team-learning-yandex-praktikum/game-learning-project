import { LoadStatus } from '@store/enums'

export interface TopicComments {
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
    comments: TopicComments[]
    description?: string
}

export interface TopicState {
    status: LoadStatus
    topicData?: Topic
    error?: string | null
}
