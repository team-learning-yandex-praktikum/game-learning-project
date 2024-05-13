export interface CreateCommentDTO {
    comment: string
    topicId: number
    parentId: number | null
    createdBy: string
}
