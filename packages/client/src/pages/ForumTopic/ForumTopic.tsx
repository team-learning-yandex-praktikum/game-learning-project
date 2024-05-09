import { useSidebarMode } from '@utils'
import Comment from './elements/Comment'
import InputLine from './elements/InputLine'
import styles from './forumTopic.module.css'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import Loader from '@components/Loader'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { topicSelectors } from '@store/topic'
import CommentWithParent from '@pages/ForumTopic/elements/CommentWithParent'
import { TopicComments } from '@store/topic/types'
import { getTopic } from '@store/topic/thunk'

const ForumTopic = () => {
    const dispatch = useAppDispatch()
    const topicData = useAppSelector(topicSelectors.selectTopicData)
    const allComments = topicData?.comments
    const loadStatus = useAppSelector(topicSelectors.selectStatus)
    const isLoading = loadStatus === 'loading'

    const [parentCommentInfo, setParentCommentInfo] =
        useState<TopicComments | null>(null)

    const { id: topicId } = useParams()

    useEffect(() => {
        if (!topicId) {
            return
        }
        dispatch(getTopic(topicId))
    }, [dispatch, topicId])

    useSidebarMode('return')

    const onClickAnswer = (comment: TopicComments) => {
        setParentCommentInfo(comment)
    }

    const closeAnswer = () => {
        setParentCommentInfo(null)
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
                    topicData?.comments?.map(comment => {
                        if (comment.parentId) {
                            const parentComment = allComments?.find(
                                el => el.id === comment.parentId
                            )
                            return parentComment ? (
                                <CommentWithParent
                                    key={comment.id}
                                    parentComment={parentComment}
                                    childrenComment={comment}
                                />
                            ) : null
                        }
                        return (
                            <Comment
                                key={comment.id}
                                onClickAnswer={onClickAnswer}
                                comment={comment}
                                showButton
                            />
                        )
                    })
                )}
            </main>
            {topicId && (
                <InputLine
                    id={topicId}
                    parentInfo={parentCommentInfo}
                    closeAnswer={closeAnswer}
                />
            )}
        </div>
    )
}

export default ForumTopic
