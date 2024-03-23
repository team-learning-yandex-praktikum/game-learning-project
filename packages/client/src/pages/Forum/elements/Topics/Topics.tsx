import { FC } from 'react'
import SearchInput from '@pages/Forum/elements/SearchInput'
import Topic from '@pages/Forum/elements/Topic'
import styles from './topics.module.css'
import { FORUM_TOPIC_STUB } from './stub'

const Topics: FC = () => (
    <div className={styles.root}>
        <header className={styles.header}>
            <div className={styles.searchInput}>
                <SearchInput />
            </div>
            <div className={styles.divider} />
        </header>
        <main className={styles.content}>
            {Array(30)
                .fill(FORUM_TOPIC_STUB)
                .map((topic, index) => (
                    <Topic id={index + 1} key={index} {...topic} />
                ))}
        </main>
    </div>
)

export default Topics
