import { useAppDispatch, useAppSelector } from '@store/hooks'
import { userSelectors } from '@store/user'
import styles from './emojiList.module.css'
import { forumActions, forumSelectors } from '@store/forum'
import { EmojiProps } from './types'
import { FC } from 'react'
import { ReactionDTO } from '@api/reaction/types'
import { addReaction } from '@store/topic/thunk'

const EmojiList: FC<EmojiProps> = ({ topicId }) => {
    const userData = useAppSelector(userSelectors.selectData)
    const emojis = useAppSelector(forumSelectors.selectEmojis)
    const topicEmoji = useAppSelector(forumSelectors.selectTopicEmoji)
    const dispatch = useAppDispatch()
    const handleEmojiClick = (
        event: React.MouseEvent<HTMLElement>,
        emojiId: number
    ) => {
        event.preventDefault()
        try {
            dispatch(
                addReaction({
                    emojiId: emojiId,
                    userId: userData.id,
                    topicId: topicId,
                })
            ).then(() => {
                if (
                    topicEmoji &&
                    topicEmoji[topicId]?.find(el => el.userId === userData.id)
                ) {
                    const updatedTopicEmoji = topicEmoji[topicId].map(el => {
                        if (el.userId === userData.id) {
                            return { ...el, emojiId: emojiId }
                        } else {
                            return el
                        }
                    })

                    const newTopicEmoji = {
                        ...topicEmoji,
                        [topicId]: updatedTopicEmoji,
                    }
                    dispatch(forumActions.updateTopicEmoji(newTopicEmoji))
                } else {
                    const newReaction: ReactionDTO = {
                        userId: userData.id,
                        emojiId: emojiId,
                        topicId: topicId,
                    }
                    const updatedTopicEmoji =
                        topicEmoji && topicEmoji[topicId]
                            ? [...topicEmoji[topicId], newReaction]
                            : [newReaction]
                    const newTopicEmoji = {
                        ...topicEmoji,
                        [topicId]: updatedTopicEmoji,
                    }
                    dispatch(forumActions.updateTopicEmoji(newTopicEmoji))
                }
            })
        } catch (error) {
            console.error(error)
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
