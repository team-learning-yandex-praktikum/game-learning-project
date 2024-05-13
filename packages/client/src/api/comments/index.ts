import { BaseApi } from '@api/baseApi'
import { CreateCommentDTO } from './types'

export class CommentsApi extends BaseApi {
    constructor() {
        super('comments', false)
    }

    createComment = async (commentData: CreateCommentDTO) => {
        const { data } = await this.client.post<string>(
            this.withUrl(),
            commentData
        )
        return data
    }
}

export const commentsApi = new CommentsApi()
