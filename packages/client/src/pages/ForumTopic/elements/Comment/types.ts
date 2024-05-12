import { TopicComment } from '@store/topic/types'

export interface CommentProps {
    comment: TopicComment
    onClickAnswer?: (comment: TopicComment) => void
    showButton?: boolean
}
