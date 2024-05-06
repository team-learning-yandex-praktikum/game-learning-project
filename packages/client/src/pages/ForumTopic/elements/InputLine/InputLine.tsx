import { FC, useCallback } from 'react'
import styles from './inputLine.module.css'
import TextField from '@components/TextField'
import { SendIcon, SmileIcon } from '@assets/icons'
import { SubmitHandler, useForm } from 'react-hook-form'
import { InputLineFieldValues, InputLineProps } from './types'
import { useAppDispatch } from '@store/hooks'
import { createComment } from '@store/topic/thunk'

const InputLine: FC<InputLineProps> = ({ id }) => {
    const {
        register,
        handleSubmit,
        formState: { isValid },
        reset,
    } = useForm<InputLineFieldValues>()

    const dispatch = useAppDispatch()

    const create = useCallback(
        ({ comment }: { comment: string }) => {
            dispatch(createComment({ topicId: id, comment, parentId: id }))
        },
        [dispatch]
    )

    const onSubmit: SubmitHandler<InputLineFieldValues> = useCallback(data => {
        create(data)
        reset()
    }, [])

    return (
        <form className={styles.root} onSubmit={handleSubmit(onSubmit)}>
            <SmileIcon className={styles.emojiButton} />
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
