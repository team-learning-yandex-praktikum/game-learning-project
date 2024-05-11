import { Router } from 'express'
import { body, param } from 'express-validator'
import { ERRORS } from '../error/constants'
import { ThemeController } from '../controllers/theme.controller'

const THEME_ROUTES = {
    base: '/theme',
    all: '/',
    create: '/',
    byId: '/:id',
}

export const themeRoutes = (router: Router) => {
    const themeRouter = Router()

    themeRouter.get(THEME_ROUTES.all, ThemeController.findAll)
    themeRouter.get(
        THEME_ROUTES.byId,
        param('id').exists().withMessage(ERRORS.empty),
        ThemeController.findById
    )
    themeRouter.post(
        THEME_ROUTES.create,
        body('theme').exists().withMessage(ERRORS.empty),
        ThemeController.create
    )

    router.use(THEME_ROUTES.base, themeRouter)
}
