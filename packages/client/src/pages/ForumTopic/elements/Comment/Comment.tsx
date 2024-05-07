import { FC } from 'react'
import styles from './comment.module.css'
import { CommentProps } from './types'
import { useAppSelector } from '@store/hooks'
import { topicSelectors } from '@store/topic'

const Comment: FC<CommentProps> = ({
    comment,
    showButton = false,
    onClickAnswer,
}) => {
    const { createdBy, createdAt, content } = comment
    const topicData = useAppSelector(topicSelectors.selectTopicData)
    const allComments = topicData?.comments
    const isParent = allComments?.some(topic => topic.parentId === comment.id)

    return (
        <div className={styles.root}>
            <div className={styles.meta}>
                <span className={styles.author}>{createdBy}</span>
                <span className={styles.date}>{createdAt}</span>
            </div>
            <div className={styles.meta}>
                <div>{content}</div>
                {showButton && onClickAnswer && !isParent && (
                    <button
                        className={styles.reply}
                        onClick={() => {
                            onClickAnswer(comment)
                        }}
                    >
                        Reply
                    </button>
                )}
            </div>
        </div>
    )
}

export default Comment
