import { FC, useState } from 'react'
import styles from './profilePassword.module.css'
import Title from '@components/Title'
import TextField from '@components/TextField'
import { TextFieldProps } from '@components/TextField/types'
import Button from '@components/Button'

const fieldsConfig: TextFieldProps[] = [
  {
    name: 'password',
    label: 'Старый пароль',
    placeholder: 'Иван',
    type: 'password',
  },
  {
    name: 'password_new',
    label: 'Новый пароль',
    placeholder: 'Иванов',
    type: 'password',
  },
  {
    name: 'password_new_repeat',
    label: 'Новый пароль (еще раз)',
    placeholder: 'ivan@test.ru',
    type: 'password',
  },
]

export const ProfilePassword: FC = () => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const toggleEditMode = () => {
    setEditMode(prevEditMode => !prevEditMode)
  }
  return (
    <>
      <Title className={styles.title}>Изменить пароль</Title>
      <form className={styles.fields}>
        {fieldsConfig.map(config => (
          <TextField key={config.name} {...config} />
        ))}
      </form>
      <Button
        className={styles.button}
        variant="outlined"
        onClick={toggleEditMode}>
        Сохранить
      </Button>
    </>
  )
}

export default ProfilePassword
