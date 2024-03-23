import { FC, useCallback } from 'react'
import styles from './inputLine.module.css'
import TextField from '@components/TextField'
import { SendIcon, SmileIcon } from '@assets/icons'
import { SubmitHandler, useForm } from 'react-hook-form'
import { InputLineFieldValues } from './types'

const InputLine: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm<InputLineFieldValues>()

    const onSubmit: SubmitHandler<InputLineFieldValues> = useCallback(data => {
        console.log(data)
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
