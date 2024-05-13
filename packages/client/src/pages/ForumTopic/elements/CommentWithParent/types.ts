import { TopicComment } from '@store/topic/types'

export interface CommentWithParentProps {
    parentComment: TopicComment
    childrenComment: TopicComment
}
