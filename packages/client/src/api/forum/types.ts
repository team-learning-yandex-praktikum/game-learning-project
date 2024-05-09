export interface TopicsGetParams {
    limit?: number
    offset?: number
    search?: string
}

export interface CreateTopicDTO {
    title: string
    description: string
    createdBy: string
}

export interface CreateCommentDTO {
    comment: string
    topicId: number
    parentId: number | null
}

export interface CreateResponse {
    id: string
}
