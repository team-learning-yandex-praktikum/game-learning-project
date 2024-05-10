import type { Request, Response } from 'express'
import { emojiService } from '../services/emoji.service'

export class EmojiController {
    static getEmojis = async (req: Request, res: Response) => {
        const category = req.query.cat as string
        const list = await emojiService.findAll(category)
        res.json(list)
    }
}
