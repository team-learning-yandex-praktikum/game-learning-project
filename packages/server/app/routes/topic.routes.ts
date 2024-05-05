import { Router } from 'express'
import { TopicController } from '../controllers/topic.controller'
import { body, param } from 'express-validator'
import { ERRORS, getLengthError } from '../error/constants'
import {
    TOPIC_DESCRIPTION_LIMITS,
    TOPIC_TITLE_LIMITS,
    USER_LOGIN_LIMITS,
} from '../validation/constants'

const TOPIC_ROUTES = {
    base: '/topics',
    all: '/',
    create: '/',
    byId: '/:id',
}

export const topicRoutes = (router: Router) => {
    const topicRouter = Router()

    topicRouter.get(
        TOPIC_ROUTES.all,
        body('title')
            .isLength({ max: TOPIC_TITLE_LIMITS.max })
            .withMessage(getLengthError(TOPIC_TITLE_LIMITS.max)),
        TopicController.findAll
    )
    topicRouter.post(
        TOPIC_ROUTES.create,
        body('title')
            .exists()
            .withMessage(ERRORS.empty)
            .isLength({ max: TOPIC_TITLE_LIMITS.max })
            .withMessage(getLengthError(TOPIC_TITLE_LIMITS.max)),
        body('description')
            .exists()
            .withMessage(ERRORS.empty)
            .isLength({ max: TOPIC_DESCRIPTION_LIMITS.max })
            .withMessage(getLengthError(TOPIC_DESCRIPTION_LIMITS.max)),
        body('createdBy')
            .exists()
            .withMessage(ERRORS.empty)
            .isLength({ max: USER_LOGIN_LIMITS.max })
            .withMessage(getLengthError(USER_LOGIN_LIMITS.max)),
        TopicController.create
    )
    topicRouter.get(
        TOPIC_ROUTES.byId,
        param('id').exists().withMessage(ERRORS.empty),
        TopicController.findById
    )

    router.use(TOPIC_ROUTES.base, topicRouter)
}
