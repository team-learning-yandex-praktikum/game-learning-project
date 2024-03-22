import { FC } from 'react'
import { Routes } from '@routes/constants'
import Form from '@components/Form'
import { fieldsConfig } from '@utils/validation/fieldsConfig'
import { authApi } from '@api'
import { useAuthentication } from '@utils'
import { omit } from 'lodash'

const Registration: FC = () => {
  const onRegistration = useAuthentication(authApi.create)

  return (
    <Form
      title={'Регистрация'}
      fields={omit(fieldsConfig, [
        'old_password',
        'new_password',
        'new_password_repeat',
      ])}
      SubmitButtonProps={{
        children: 'Сохранить',
      }}
      LinkProps={{
        children: 'Вход',
        to: Routes.Login,
      }}
      onSubmit={onRegistration}
    />
  )
}

export default Registration
