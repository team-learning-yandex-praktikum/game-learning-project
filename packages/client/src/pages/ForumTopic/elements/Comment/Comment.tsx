import { FC } from 'react'
import styles from './comment.module.css'
import { CommentProps } from './types'
import { transformDate } from '@utils/data/transformDate'

const Comment: FC<CommentProps> = ({
    comment,
    showButton = false,
    onClickAnswer,
}) => {
    const { createdBy, createdAt, comment: content } = comment

    return (
        <div className={styles.root}>
            <div className={styles.meta}>
                <span className={styles.author}>{createdBy}</span>
                <span className={styles.date}>
                    {transformDate.from.server(createdAt)}
                </span>
            </div>
            <div className={styles.meta}>
                <div>{content}</div>
                {showButton && (
                    <button
                        className={styles.reply}
                        onClick={() => {
                            onClickAnswer?.(comment)
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
