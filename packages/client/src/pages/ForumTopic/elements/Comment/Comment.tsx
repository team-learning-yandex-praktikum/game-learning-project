import { FC } from 'react'
import styles from './comment.module.css'
import { CommentProps } from './types'

const Comment: FC<CommentProps> = ({ author, date, content }) => (
  <div className={styles.root}>
    <div className={styles.meta}>
      <span className={styles.author}>{author}</span>
      <span className={styles.date}>{date}</span>
    </div>
    <div>{content}</div>
  </div>
)

export default Comment
