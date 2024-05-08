import { Emoji } from '../../models/emoji.model'
import { getUnicodeHex } from '../../utils/StrFunc'
import { EmojiRec, hands, smileys, symbols } from './EmojiData'

function map(data: EmojiRec[], category: string) {
    function toEmoji(rec: EmojiRec) {
        const char = rec[0]
        return {
            char: char,
            code: getUnicodeHex(char),
            name: rec[1],
            category: category,
        }
    }

    return data.map(toEmoji)
}

export async function uploadEmojiToDB() {
    const count = await Emoji.count()

    if (count > 0) {
        await Emoji.destroy({
            truncate: true,
        })
    }

    const sm = map(smileys, 'smileys')
    const h = map(hands, 'hands')
    const s = map(symbols, 'symbols')

    const arr = [...sm, ...h, ...s]
    await Emoji.bulkCreate(arr)
}
