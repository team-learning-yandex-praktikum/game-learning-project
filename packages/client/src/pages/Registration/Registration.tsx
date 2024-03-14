import { FC } from 'react'
import { TextFieldProps } from '@components/TextField/types'
import { Routes } from '@routes/constants'
import AuthForm from '@components/AuthForm'

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
  {
    name: 'password',
    label: 'Пароль',
    placeholder: 'qwerty',
    type: 'password',
  },
  {
    name: 'repeat_password',
    label: 'Пароль (ещё раз)',
    placeholder: 'qwerty',
    type: 'password',
  },
]

const Registration: FC = () => (
  <AuthForm
    title={'Регистрация'}
    fields={fieldsConfig}
    SubmitButtonProps={{
      children: 'Сохранить',
    }}
    LinkProps={{
      children: 'Вход',
      to: Routes.Login,
    }}
  />
)

export default Registration
