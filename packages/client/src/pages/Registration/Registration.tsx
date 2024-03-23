import { FC } from 'react'
import { Routes } from '@routes/constants'
import Form from '@components/Form'
import { fieldsConfig } from '@utils/validation/fieldsConfig'
import { useAuthentication } from '@utils'
import { omit } from 'lodash'
import { useAppDispatch } from '@store/hooks'
import { registration } from '@store/user'
import { RequestRegistrationData } from '@store/user/types'

const Registration: FC = () => {
    const dispatch = useAppDispatch()
    const onRegistration = useAuthentication(
        async (data: RequestRegistrationData) => {
            await dispatch(registration(data)).unwrap()
        }
    )

    return (
        <Form
            title={'Регистрация'}
            fields={omit(fieldsConfig, [
                'displayName',
                'oldPassword',
                'newPassword',
                'newPasswordRepeat',
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
