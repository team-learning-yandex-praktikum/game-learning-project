import { FC } from 'react'
import { Routes } from '@routes/constants'
import Form from '@components/Form'
import { fieldsConfig } from '@utils/validation/fieldsConfig'
import { omit } from 'lodash'

const Registration: FC = () => (
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
    onSubmit={data => {
      console.log(data)
    }}
  />
)

export default Registration
