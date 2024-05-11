import { useAppDispatch, useAppSelector } from '@store/hooks'
import { userSelectors } from '@store/user'
import styles from './emojiList.module.css'
import { forumSelectors } from '@store/forum'
import { EmojiProps } from './types'
import React, { FC } from 'react'
import { addReaction } from '@store/topic/thunk'

const EmojiList: FC<EmojiProps> = ({ topicId }) => {
    const userData = useAppSelector(userSelectors.selectData)
    const emojis = useAppSelector(forumSelectors.selectEmojis)
    const dispatch = useAppDispatch()
    const handleEmojiClick = (
        event: React.MouseEvent<HTMLElement>,
        emojiId: number
    ) => {
        event.preventDefault()
        if (userData?.id && emojiId && topicId) {
            dispatch(
                addReaction({
                    emojiId: emojiId,
                    userId: userData.id,
                    topicId: topicId,
                })
            )
        }
    }

    return (
        <div className={styles.emojiListContainer}>
            {emojis?.map(emoji => (
                <span
                    key={emoji.id}
                    title={emoji.code}
                    className={styles.emoji}
                    onClick={event => handleEmojiClick(event, emoji.id)}
                >
                    {emoji.char}
                </span>
            ))}
        </div>
    )
}

export default EmojiList
