import { FC, useState } from 'react'
import styles from './profileInfo.module.css'
import Title from '@components/Title'
import TextField from '@components/TextField'
import { TextFieldProps } from '@components/TextField/types'
import Button from '@components/Button'
import Avatar from '@/components/Avatar'

const fieldsConfig: TextFieldProps[] = [
  {
    name: 'first_name',
    label: 'Имя',
    placeholder: 'Иван',
  },
  {
    name: 'second_name',
    label: 'Фамилия',
    placeholder: 'Иванов',
  },
  {
    name: 'email',
    label: 'Почта',
    placeholder: 'ivan@test.ru',
  },
  {
    name: 'phone',
    label: 'Телефон',
    placeholder: '+7 999 999 99 99',
  },
  {
    name: 'login',
    label: 'Логин',
    placeholder: 'ivan_ivanov',
  },
]

export const ProfileInfo: FC = () => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const toggleEditMode = () => {
    setEditMode(prevEditMode => !prevEditMode)
  }
  return (
    <>
      <Avatar />
      <Title className={styles.title}>ivan_ivanov</Title>
      <form className={styles.fields}>
        {fieldsConfig.map(config => (
          <TextField key={config.name} {...config} readOnly={!editMode} />
        ))}
      </form>
      {editMode ? (
        <>
          <Button className={styles.button} variant="outlined">
            Сохранить
          </Button>
          <Button
            className={styles.button}
            variant="outlined"
            onClick={toggleEditMode}>
            Отменить
          </Button>
        </>
      ) : (
        <Button
          className={styles.button}
          variant="outlined"
          onClick={toggleEditMode}>
          Изменить
        </Button>
      )}
    </>
  )
}

export default ProfileInfo
