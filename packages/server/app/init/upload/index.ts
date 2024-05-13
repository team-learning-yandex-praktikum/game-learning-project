import { uploadEmojiToDB } from './uploadEmoji'
import { uploadThemesToDB } from './uploadThemes'

export const dbFill = async () => {
    await uploadEmojiToDB()
    await uploadThemesToDB()
}
