import { useSidebarMode } from '@utils'
import Comment from './elements/Comment'
import InputLine from './elements/InputLine'
import styles from './forumTopic.module.css'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import Loader from '@components/Loader'
import Empty from '@components/Empty'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import { getTopic } from '@store/topic/thunk'
import { topicSelectors } from '@store/topic'

const ForumTopic = () => {
    const topicData = useAppSelector(topicSelectors.selectTopicData)

    const loadStatus = useAppSelector(topicSelectors.selectStatus)
    const isLoading = loadStatus === 'loading'

    const dispatch = useAppDispatch()
    const { id: topicId } = useParams()

    useEffect(() => {
        if (topicId) {
            dispatch(getTopic(topicId))
        }
    }, [dispatch, topicId])

    useSidebarMode('return')

    if (!topicData?.comments.length) {
        return <Empty />
    }

    return (
        <div className={styles.root}>
            <header className={styles.header}>
                <div className={styles.topicInfo}>
                    <div className={styles.meta}>
                        <span className={styles.author}>
                            {topicData?.createdBy}
                        </span>
                        <span className={styles.date}>
                            {topicData?.createdAt}
                        </span>
                    </div>
                    <div className={styles.title}>{topicData?.title}</div>
                    {topicData?.description && (
                        <div className={styles.description}>
                            {topicData.description}
                        </div>
                    )}
                </div>
                <div className={styles.divider} />
                <div className={styles.subTitle}>Комментарии</div>
            </header>
            <main className={styles.content}>
                {isLoading ? (
                    <Loader />
                ) : (
                    topicData?.comments?.map((comment, index) => (
                        <Comment key={index} {...comment} />
                    ))
                )}
            </main>
            {topicId && <InputLine id={topicId} />}
        </div>
    )
}

export default ForumTopic
