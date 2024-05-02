import { FC } from 'react'
import styles from './comment.module.css'
import { CommentProps } from './types'

const Comment: FC<CommentProps> = ({ createdBy, createdAt, content }) => (
    <div className={styles.root}>
        <div className={styles.meta}>
            <span className={styles.author}>{createdBy}</span>
            <span className={styles.date}>{createdAt}</span>
        </div>
        <div>{content}</div>
    </div>
)

export default Comment
