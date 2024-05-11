import { Router } from 'express'
import { topicRoutes } from './topic.routes'
import { commentRoutes } from './comment.routes'
import { reactionRoutes } from './reaction.routes'
import { emojiRoutes } from './emoji.routes'
import { userThemeRoutes } from './userTheme.routes'
import { themeRoutes } from './theme.routes'

export const createRouter = () => {
    const router = Router()

    topicRoutes(router)
    commentRoutes(router)
    reactionRoutes(router)
    emojiRoutes(router)
    userThemeRoutes(router)
    themeRoutes(router)

    return router
}
