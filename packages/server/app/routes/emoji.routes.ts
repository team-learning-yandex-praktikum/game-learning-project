import { Router } from 'express'
import { EmojiController } from '../controllers/emoji.controller'

export function emojiRoutes(router: Router) {
    const emojiRouter = Router()

    emojiRouter.get('/', EmojiController.getEmojis)

    router.use('/emoji', emojiRouter)
}
