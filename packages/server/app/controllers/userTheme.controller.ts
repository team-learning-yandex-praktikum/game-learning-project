import type { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import {
    type UserThemeFindRequest,
    userThemeService,
} from '../services/userTheme.service'
import { ERRORS } from '../error/constants'
import { themeService } from '../services/theme.service'

export class UserThemeController {
    public static create = async (request: Request, response: Response) => {
        const errors = validationResult(request)
        if (!errors.isEmpty()) {
            response.status(400).json({ errors: errors.array() })
            return
        }

        const { body } = request
        const theme = await themeService.findById(body.themeId)

        if (!theme) {
            response.status(404).json({ error: 'Theme is not found' })
            return
        }

        const userTheme = await userThemeService.findOrCreate(body)

        const responseData = {
            ...userTheme.toJSON(),
            theme: theme.theme,
        }
        response.status(201).send(responseData)
    }

    public static findByParams = async (
        request: Request,
        response: Response
    ) => {
        const errors = validationResult(request)
        if (!errors.isEmpty()) {
            response.status(400).json({ errors: errors.array() })
            return
        }

        const query = request.query as unknown as UserThemeFindRequest
        const userTheme = await userThemeService.findByParams(query)

        if (!userTheme) {
            response.status(404).send(ERRORS.notFound)
            return
        }

        const theme = await themeService.findById(userTheme.themeId)
        if (!theme) {
            response.status(404).json({
                error: `Theme with id ${userTheme.themeId} is not found`,
            })
            return
        }
        const responseData = {
            ...userTheme.toJSON(),
            theme: theme.theme,
        }
        response.send(responseData)
    }
}
