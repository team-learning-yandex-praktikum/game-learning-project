import { ReactionController } from '../controllers/reaction.controller'
import { Router } from 'express'
import { body, param } from 'express-validator'
import { ERRORS } from '../error/constants'

export function reactionRoutes(router: Router) {
    const reactionRouter = Router()

    reactionRouter.post(
        '/:topicId/:userId',
        param('topicId').exists().withMessage(ERRORS.empty),
        param('userId').exists().withMessage(ERRORS.empty),
        body('emojiId').exists().withMessage(ERRORS.empty),
        ReactionController.addOnTopic
    )

    reactionRouter.get(
        '/:topicId',
        param('topicId').exists().withMessage(ERRORS.empty),
        ReactionController.getByTopic
    )

    reactionRouter.post(
        '/',
        body('topicIds').exists().withMessage(ERRORS.empty),
        ReactionController.getByManyTopics
    )

    router.use('/reaction', reactionRouter)
}
