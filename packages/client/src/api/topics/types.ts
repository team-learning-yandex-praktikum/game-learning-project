export interface TopicsGetParams {
    limit?: number
    offset?: number
    title?: string
}

export interface CreateTopicDTO {
    title: string
    description: string
    createdBy: string
}
