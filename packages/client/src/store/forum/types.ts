import { EmojiDTO } from '@api/emoji/types'
import { ReactionDTO } from '@api/reaction/types'
import { Topic } from '@store/topic/types'
import { BaseState } from '@utils/store/types'

export type Topics = Omit<Topic, 'comments'>

export interface ForumState extends BaseState {
    topicsData: Topics[]
    topicEmoji?: Record<number, ReactionDTO[]>
    emojis?: EmojiDTO[]
    emojisByTopic?: Record<number, EmojiDTO>
}
