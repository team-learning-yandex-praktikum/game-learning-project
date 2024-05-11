import { FC, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './topic.module.css'
import { Topics } from '@store/forum/types'
import { SmileIcon } from '@assets/icons'
import EmojiList from '@pages/ForumTopic/elements/EmojiList'
import { useAppSelector } from '@store/hooks'
import { forumSelectors } from '@store/forum'

const Topic: FC<Topics> = ({
    id,
    title,
    description,
    createdBy,
    createdAt,
    emoji,
}) => {
    const [showEmojiList, setShowEmojiList] = useState(false)
    const topicEmoji = useAppSelector(forumSelectors.selectEmojisByTopic)
    const handleEmojiClick = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            event.preventDefault()
            setShowEmojiList(prevState => !prevState)
        },
        []
    )

    const handleMouseLeave = useCallback(() => {
        setShowEmojiList(false)
    }, [])
    return (
        <Link
            to={id.toString()}
            className={styles.root}
            onMouseLeave={handleMouseLeave}
        >
            <div className={styles.header}>
                <div className={styles.title}>{title}</div>
                <div className={styles.emojiContainer}>
                    <SmileIcon
                        className={styles.emojiButton}
                        onClick={handleEmojiClick}
                    />
                    {showEmojiList && <EmojiList topicId={id} />}
                </div>
            </div>
            {description && (
                <div className={styles.description}>{description}</div>
            )}
            <div className={styles.meta}>
                <span className={styles.author}>{createdBy}</span>
                <span className={styles.date}>{createdAt}</span>
            </div>
            {Boolean(emoji?.length) && (
                <div className={styles.selectedEmoji}>
                    {emoji?.map((reaction, index) => (
                        <span key={index}>
                            {topicEmoji && topicEmoji[reaction.emojiId]?.char}
                        </span>
                    ))}
                </div>
            )}
        </Link>
    )
}

export default Topic
