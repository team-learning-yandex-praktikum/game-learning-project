import { FC } from 'react'
import { Routes } from '@routes/constants'
import Form from '@components/Form'
import { fieldsConfig } from '@utils/validation/fieldsConfig'

const Login: FC = () => (
  <Form
    title={'Вход'}
    fields={{
      login: fieldsConfig.login,
      password: fieldsConfig.password,
    }}
    SubmitButtonProps={{
      children: 'Войти',
    }}
    LinkProps={{
      children: 'Регистрация',
      to: Routes.Registration,
    }}
    onSubmit={data => {
      console.log(data)
    }}
  />
)

export default Login
