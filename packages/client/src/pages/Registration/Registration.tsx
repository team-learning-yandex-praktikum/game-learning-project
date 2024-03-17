import { FC } from 'react'
import { Routes } from '@routes/constants'
import Form from '@components/Form'
import { fieldsConfig } from '@utils/validation/fieldsConfig'
import { authApi } from '@api'
import { useAuthentication } from '@utils'

const Registration: FC = () => {
  const onRegistration = useAuthentication(authApi.create)

  return (
    <Form
      title={'Регистрация'}
      fields={fieldsConfig}
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
