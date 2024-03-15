import { FC } from 'react'
import { Routes } from '@routes/constants'
import Form from '@components/Form'
import { fieldsConfig } from '@utils/validation/fieldsConfig'

const Registration: FC = () => (
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
    onSubmit={data => {
      console.log(data)
    }}
  />
)

export default Registration
