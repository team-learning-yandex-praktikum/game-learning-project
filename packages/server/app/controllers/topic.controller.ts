import type { Request } from 'express'
import { topicService } from '../services/topic.service'

export class TopicController {
    public static create = async (request: Request) => {
        const { body } = request
        await topicService.create(body)
    }
}
