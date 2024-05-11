import { EmojiDTO } from '@api/emoji/types'
import { ReactionDTO } from '@api/reaction/types'
import { LoadStatus } from '@store/enums'
import { Topic } from '@store/topic/types'

export type Topics = Omit<Topic, 'comments'>

export interface ForumState {
    topicsData: Topics[]
    topicEmoji?: Record<number, ReactionDTO[]>
    status: LoadStatus
    error?: string | null
    emojis?: EmojiDTO[]
    emojisByTopic?: Record<number, EmojiDTO>
}
