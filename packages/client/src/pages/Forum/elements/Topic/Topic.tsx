import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './topic.module.css'
import { Topics } from '@store/forum/types'

const Topic: FC<Topics> = ({
    id,
    title,
    description,
    createdBy,
    createdAt,
}) => (
    <Link to={id.toString()} className={styles.root}>
        <div className={styles.title}>{title}</div>
        {description && <div className={styles.description}>{description}</div>}
        <div className={styles.meta}>
            <span className={styles.author}>{createdBy}</span>
            <span className={styles.date}>{createdAt}</span>
        </div>
    </Link>
)

export default Topic
