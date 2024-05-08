import { TopicComments } from '@store/topic/types'

export interface CommentProps {
    comment: TopicComments
    onClickAnswer?: (comment: TopicComments) => void
    showButton?: boolean
}
