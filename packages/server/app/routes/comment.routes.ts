import { Router } from 'express'
import { CommentController } from '../controllers/comment.controller'
import { body } from 'express-validator'
import { ERRORS, getLengthError } from '../error/constants'
import { COMMENT_LIMITS, USER_LOGIN_LIMITS } from '../validation/constants'

const COMMENT_ROUTES = {
    base: '/comments',
    all: '/',
    create: '/',
}

export const commentRoutes = (router: Router) => {
    const commentRouter = Router()

    commentRouter.get(COMMENT_ROUTES.all, CommentController.findAll)
    commentRouter.post(
        COMMENT_ROUTES.create,
        body('topicId').exists().withMessage(ERRORS.empty),
        body('comment')
            .exists()
            .withMessage(ERRORS.empty)
            .isLength({ max: COMMENT_LIMITS.max })
            .withMessage(getLengthError(COMMENT_LIMITS.max)),
        body('createdBy')
            .exists()
            .withMessage(ERRORS.empty)
            .isLength({ max: USER_LOGIN_LIMITS.max })
            .withMessage(getLengthError(USER_LOGIN_LIMITS.max)),
        CommentController.create
    )

    router.use(COMMENT_ROUTES.base, commentRouter)
}
