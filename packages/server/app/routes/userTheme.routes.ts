import { Router } from 'express'
import { body, query } from 'express-validator'
import { ERRORS } from '../error/constants'
import { UserThemeController } from '../controllers/userTheme.controller'

const USER_THEME_ROUTES = {
    base: '/userTheme',
    byParams: '/',
    create: '/',
}

export const userThemeRoutes = (router: Router) => {
    const userThemeRouter = Router()

    userThemeRouter.get(
        USER_THEME_ROUTES.byParams,
        query('ownerId').exists().withMessage(ERRORS.empty),
        UserThemeController.findByParams
    )
    userThemeRouter.post(
        USER_THEME_ROUTES.create,
        body('theme').exists().withMessage(ERRORS.empty),
        body('ownerId').exists().withMessage(ERRORS.empty),
        UserThemeController.create
    )

    router.use(USER_THEME_ROUTES.base, userThemeRouter)
}
