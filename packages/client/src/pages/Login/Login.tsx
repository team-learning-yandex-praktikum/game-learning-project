import { FC } from 'react'
import { Routes } from '@routes/constants'
import Form from '@components/Form'
import { fieldsConfig } from '@utils/validation/fieldsConfig'
import { authApi } from '@api'
import { useAuthentication } from '@utils'

const Login: FC = () => {
  const onLogin = useAuthentication(authApi.login)

  return (
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
      onSubmit={onLogin}
    />
  )
}

export default Login
