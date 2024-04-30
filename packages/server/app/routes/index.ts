import { Router } from 'express'
import { topicRoutes } from './topic.routes'

export const createRouter = () => {
    const router = Router()

    topicRoutes(router)

    return router
}
