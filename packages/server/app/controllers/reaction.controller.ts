import { reactionService } from '../services/reaction.service'
import type { Request, Response } from 'express'
import { validationResult } from 'express-validator'

const responseOK = 'Ok'

export class ReactionController {
    static async getByTopic(req: Request, res: Response) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
            return
        }
        const topicId = Number(req.params.topicId)
        const reactions = await reactionService.getByTopic(topicId)
        res.json(reactions)
    }

    static async getByManyTopics(req: Request, res: Response) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
            return
        }
        const ids = req.body.topicIds as string[]
        const topicsToReactions = await reactionService.getByTopics(ids)
        res.json(topicsToReactions)
    }

    static async addOnTopic(req: Request, res: Response) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
            return
        }
        const { body } = req
        const topicId = Number(req.params.topicId)
        const userId = Number(req.params.userId)
        const emojiId = Number(body.emojiId)
        body.topicId = topicId
        body.userId = userId
        body.emojiId = emojiId

        await reactionService.addOrUpdate(body)

        res.status(201).send(responseOK)
    }
}
