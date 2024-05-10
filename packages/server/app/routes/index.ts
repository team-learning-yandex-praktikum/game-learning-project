import { Router } from 'express'
import { topicRoutes } from './topic.routes'
import { commentRoutes } from './comment.routes'
import { reactionRoutes } from './reaction.routes'
import { emojiRoutes } from './emoji.routes'

export const createRouter = () => {
    const router = Router()

    topicRoutes(router)
    commentRoutes(router)
    reactionRoutes(router)
    emojiRoutes(router)

    return router
}
