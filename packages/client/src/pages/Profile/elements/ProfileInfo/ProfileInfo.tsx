import { FC, useState } from 'react'
import styles from './profileInfo.module.css'
import Title from '@components/Title'
import Avatar from '@/components/Avatar'
import Form from '@components/Form'
import { fieldsConfig } from '@utils/validation/fieldsConfig'
import { omit } from 'lodash'
import { FIELDS } from '@/utils/validation/fields'

const defaultValues: Partial<Record<FIELDS, string>> = {
  [FIELDS.first_name]: 'Иван',
  [FIELDS.second_name]: 'Иванов',
  [FIELDS.email]: 'ivan@test.ru',
  [FIELDS.phone]: '89270000000',
  [FIELDS.login]: 'ivan_ivanov',
}

export const ProfileInfo: FC = () => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const toggleEditMode = () => {
    setEditMode(prevEditMode => !prevEditMode)
  }
  return (
    <>
      <Avatar />
      <Title className={styles.title}>ivan_ivanov</Title>
      <Form
        fields={omit(fieldsConfig, [
          'password',
          'repeat_password',
          'old_password',
          'new_password',
          'new_password_repeat',
        ])}
        disabled={!editMode}
        defaultValues={defaultValues}
        SubmitButtonProps={{
          children: editMode ? 'Сохранить' : 'Изменить',
          variant: 'outlined',
        }}
        CancelButtonProps={
          editMode
            ? {
                children: 'Отменить',
                variant: 'outlined',
                onClick: toggleEditMode,
              }
            : undefined
        }
        onSubmit={toggleEditMode}
      />
    </>
  )
}

export default ProfileInfo
