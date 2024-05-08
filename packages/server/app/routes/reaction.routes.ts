import { ReactionController } from '../controllers/reaction.controller'
import { Router } from 'express'

export function reactionRoutes(router: Router) {
    const reactionRouter = Router()
    reactionRouter.post('/:topicId/:userId', ReactionController.addOnTopic)
    reactionRouter.get('/:topicId', ReactionController.getByTopic)
    reactionRouter.post('/', ReactionController.getByManyTopics)
    reactionRouter.get('/emoji', ReactionController.getAvailableEmoticons)

    router.use('/reaction', reactionRouter)
}
