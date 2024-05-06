import { FC, memo, useEffect } from 'react'
import SearchInput from '@pages/Forum/elements/SearchInput'

import styles from './topics.module.css'
import { useAppDispatch, useAppSelector } from '@store/hooks'

import { forumSelectors } from '@store/forum'

import Loader from '@components/Loader'
import Topic from '@pages/Forum/elements/Topic'
import { getTopics } from '@store/forum/thunk'
import Empty from '@components/Empty'

const Topics: FC = () => {
    const topicsData = useAppSelector(forumSelectors.selectTopicsData)
    const loadStatus = useAppSelector(forumSelectors.selectStatus)
    const isLoading = loadStatus === 'loading'
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTopics({ limit: 20 }))
    }, [])

    if (!topicsData.length) {
        return <Empty />
    }

    return (
        <div className={styles.root}>
            <header className={styles.header}>
                <div className={styles.searchInput}>
                    <SearchInput />
                </div>
                <div className={styles.divider} />
            </header>
            <main className={styles.content}>
                {isLoading ? (
                    <Loader />
                ) : (
                    topicsData.map(topic => <Topic key={topic.id} {...topic} />)
                )}
            </main>
        </div>
    )
}

export default memo(Topics)
