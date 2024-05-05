import type { Request, Response } from 'express'
import { topicService } from '../services/topic.service'
import { validationResult } from 'express-validator'
import { ERRORS } from '../error/constants'

export class TopicController {
    public static create = async (request: Request, response: Response) => {
        const errors = validationResult(request)
        if (!errors.isEmpty()) {
            response.status(400).json({ errors: errors.array() })
            return
        }

        const { body } = request
        await topicService.create(body)
        response.status(201).send('Ok')
    }

    public static findAll = async (request: Request, response: Response) => {
        const { query } = request
        const data = await topicService.findByParams(query)

        response.send(data)
    }

    public static findById = async (request: Request, response: Response) => {
        const errors = validationResult(request)
        if (!errors.isEmpty()) {
            response.status(400).json({ errors: errors.array() })
            return
        }

        const { params } = request
        const topic = await topicService.findById(Number(params.id))

        if (!topic) {
            response.status(404).send(ERRORS.notFound)
            return
        }

        const comments = await topicService.findCommentsByTopic(topic)

        const responseData = {
            ...topic.toJSON(),
            comments,
        }

        response.send(responseData)
    }
}
