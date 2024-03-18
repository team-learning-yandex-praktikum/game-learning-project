import { FC, useCallback } from 'react'
import Title from '@components/Title'
import Button from '@components/Button'
import TextField from '@components/TextField'
import styles from './newTopic.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NewTopicFieldValues } from './types'
import { NEW_TOPIC_FIELDS_CONFIG } from './fieldsConfig'

const NewTopic: FC = () => {
  const formId = 'newTopic'

  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
  } = useForm<NewTopicFieldValues>({ mode: 'onTouched' })

  const onSubmit: SubmitHandler<NewTopicFieldValues> = useCallback(data => {
    console.log(data)
  }, [])

  return (
    <div className={styles.container}>
      <Title color={'secondary'}>Новая тема</Title>
      <form
        className={styles.form}
        id={formId}
        onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label={'Заголовок'}
          placeholder={'Введите название'}
          error={errors.name?.message}
          multiline
          {...register('name', NEW_TOPIC_FIELDS_CONFIG.name)}
        />
        <TextField
          label={'Описание'}
          placeholder={'Добавьте описание'}
          error={errors.description?.message}
          multiline
          {...register('description', NEW_TOPIC_FIELDS_CONFIG.description)}
        />
      </form>
      <Button
        variant={'outlined'}
        color={'secondary'}
        form={formId}
        type={'submit'}
        disabled={!isValid}>
        Создать
      </Button>
    </div>
  )
}

export default NewTopic
