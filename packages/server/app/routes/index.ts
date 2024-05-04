import { Router } from 'express'
import { topicRoutes } from './topic.routes'
import { commentRoutes } from './comment.routes'

export const createRouter = () => {
    const router = Router()

    topicRoutes(router)
    commentRoutes(router)

    return router
}
