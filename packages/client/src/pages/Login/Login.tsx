import { FC } from 'react'
import { TextFieldProps } from '@components/TextField/types'
import { Routes } from '@routes/constants'
import AuthForm from '@components/AuthForm'

const fieldsConfig: TextFieldProps[] = [
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
]

const Login: FC = () => (
  <AuthForm
    title={'Вход'}
    fields={fieldsConfig}
    SubmitButtonProps={{
      children: 'Войти',
    }}
    LinkProps={{
      children: 'Регистрация',
      to: Routes.Registration,
    }}
  />
)

export default Login
