import { Router } from 'express'
import { TopicController } from '../controllers/topic.controller'

export const topicRoutes = (router: Router) => {
    const topicRouter = Router()

    topicRouter.post('/', TopicController.create)

    router.use('/topic', topicRouter)
}
