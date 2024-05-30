import { FC, useCallback } from 'react'
import styles from './inputLine.module.css'
import TextField from '@components/TextField'
import { SendIcon, SmileIcon } from '@assets/icons'
import { SubmitHandler, useForm } from 'react-hook-form'
import { InputLineFieldValues, InputLineProps } from './types'
import { useAppDispatch } from '@store/hooks'
import { createComment, getTopic } from '@store/topic/thunk'
import sanitizeHtml from 'sanitize-html'

const InputLine: FC<InputLineProps> = ({ id, parentInfo, closeAnswer }) => {
    const {
        register,
        handleSubmit,
        formState: { isValid },
        reset,
    } = useForm<InputLineFieldValues>()

    const parentId = parentInfo ? parentInfo.id : null
    const dispatch = useAppDispatch()

    const create = useCallback(
        ({ comment }: { comment: string }) => {
            dispatch(createComment({ topicId: Number(id), comment, parentId }))
        },
        [dispatch, parentId]
    )

    const onSubmit: SubmitHandler<InputLineFieldValues> = useCallback(
        data => {
            const sanitizedData: InputLineFieldValues =
                {} as InputLineFieldValues
            Object.entries(data).forEach(([key, value]) => {
                sanitizedData[key as 'comment'] = sanitizeHtml(value)
            })
            create(sanitizedData)
            reset()
            dispatch(getTopic(id))
            closeAnswer()
        },
        [parentId]
    )

    return (
        <form className={styles.root} onSubmit={handleSubmit(onSubmit)}>
            <SmileIcon className={styles.emojiButton} />
            {parentId && parentInfo ? (
                <div className={styles.parent}>
                    <div className={styles.parentInfo}>
                        <span className={styles.author}>
                            {parentInfo.createdBy}
                        </span>
                        <div className={styles.parentText}>
                            {parentInfo.comment}
                        </div>
                    </div>
                    <button
                        className={styles.closeButton}
                        onClick={closeAnswer}
                    >
                        &#10006;
                    </button>
                </div>
            ) : null}
            <TextField
                disableErrorText
                className={styles.input}
                placeholder={'Введите описание'}
                {...register('comment', { required: true })}
            />
            <button type={'submit'} disabled={!isValid} className={styles.send}>
                <SendIcon />
            </button>
        </form>
    )
}

export default InputLine
