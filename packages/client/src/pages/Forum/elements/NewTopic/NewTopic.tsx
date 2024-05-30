import { useCallback } from 'react'
import Title from '@components/Title'
import Button from '@components/Button'
import TextField from '@components/TextField'
import styles from './newTopic.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NewTopicFieldValues, NewTopicFields } from './types'
import { NEW_TOPIC_FIELDS_CONFIG } from './fieldsConfig'
import { useAppDispatch } from '@store/hooks'
import { createTopic, CreateTopicData } from '@store/topic/thunk'
import sanitizeHtml from 'sanitize-html'

const NewTopic = () => {
    const formId = 'newTopic'

    const {
        formState: { errors, isValid },
        register,
        handleSubmit,
        reset,
    } = useForm<NewTopicFieldValues>({ mode: 'onTouched' })

    const dispatch = useAppDispatch()

    const create = useCallback(
        (data: CreateTopicData) => {
            dispatch(createTopic(data))
        },
        [dispatch]
    )

    const onSubmit: SubmitHandler<NewTopicFieldValues> = useCallback(
        (data: NewTopicFieldValues) => {
            const sanitizedData: CreateTopicData = {} as CreateTopicData
            Object.entries(data).forEach(([key, value]) => {
                sanitizedData[key as NewTopicFields] = sanitizeHtml(value)
            })
            create(sanitizedData)
            reset()
        },
        []
    )

    return (
        <div className={styles.container}>
            <Title color={'secondary'}>Новая тема</Title>
            <form
                className={styles.form}
                id={formId}
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    label={'Заголовок'}
                    placeholder={'Введите название'}
                    error={errors.title?.message}
                    multiline
                    {...register('title', NEW_TOPIC_FIELDS_CONFIG.title)}
                />
                <TextField
                    label={'Описание'}
                    placeholder={'Добавьте описание'}
                    error={errors.description?.message}
                    multiline
                    {...register(
                        'description',
                        NEW_TOPIC_FIELDS_CONFIG.description
                    )}
                />
            </form>
            <Button
                variant={'outlined'}
                color={'secondary'}
                form={formId}
                type={'submit'}
                disabled={!isValid}
            >
                Создать
            </Button>
        </div>
    )
}

export default NewTopic
