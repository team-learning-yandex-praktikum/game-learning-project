import Comment from '@pages/ForumTopic/elements/Comment'
import { FC } from 'react'
import { CommentWithParentProps } from './types'

import styles from './commentWithParent.module.css'

const CommentWithParent: FC<CommentWithParentProps> = ({
    parentComment,
    childrenComment,
}) => (
    <div>
        <div className={styles.parent}>
            <span className={styles.author}>{parentComment.createdBy}</span>
            <div className={styles.parentText}>{parentComment.comment}</div>
        </div>
        <div className={styles.children}>
            <Comment
                key={childrenComment.id}
                comment={childrenComment}
                showButton={false}
            />
        </div>
    </div>
)

export default CommentWithParent
