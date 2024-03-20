import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './topic.module.css'
import { TopicProps } from './types'

const Topic: FC<TopicProps> = ({ id, title, description, author, date }) => (
    <Link to={id.toString()} className={styles.root}>
        <div className={styles.title}>{title}</div>
        {description && <div className={styles.description}>{description}</div>}
        <div className={styles.meta}>
            <span className={styles.author}>{author}</span>
            <span className={styles.date}>{date}</span>
        </div>
    </Link>
)

export default Topic
