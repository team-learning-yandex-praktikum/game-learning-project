import { TopicComments } from '@store/topic/types'

export interface CommentWithParentProps {
    parentComment: TopicComments
    childrenComment: TopicComments
}
