import { BaseApi } from '@api/baseApi'
import { EmojiDTO } from './types'

export class EmojiApi extends BaseApi {
    constructor() {
        super('emoji', false)
    }

    getEmoji = async () => {
        const { data } = await this.client.get<EmojiDTO[]>(this.withUrl())
        return data
    }
}

export const emojiApi = new EmojiApi()
