import type { BaseService } from './base.service'
import type { GetRequestParams } from './types'
import { Comment, CommentCreationAttributes } from '../models/comment.model'

export type CommentCreateRequest = CommentCreationAttributes
export type CommentGetAllRequest = GetRequestParams & {
    topicId?: number
}

class CommentService implements BaseService {
    private repository = Comment

    public create = (creationData: CommentCreateRequest) =>
        this.repository.create(creationData)

    public findByParams = ({
        limit = 20,
        offset = 0,
        topicId,
    }: CommentGetAllRequest) =>
        this.repository.findAll({
            limit,
            offset,
            ...(topicId
                ? {
                      where: {
                          topicId,
                      },
                  }
                : {}),
        })
}

export const commentService = new CommentService()
