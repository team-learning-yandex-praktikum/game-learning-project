import { FC } from 'react'
import { Routes } from '@routes/constants'
import { fieldsConfig } from '@utils/validation/fieldsConfig'
import { useAuthentication } from '@utils'
import { omit } from 'lodash'
import { useAppDispatch } from '@store/hooks'
import { registration } from '@store/user'
import { RequestRegistrationData } from '@store/user/types'
import AuthForm from '@components/AuthForm'

const Registration: FC = () => {
    const dispatch = useAppDispatch()
    const onRegistration = useAuthentication(
        async (data: RequestRegistrationData) => {
            await dispatch(registration(data)).unwrap()
        }
    )

    return (
        <AuthForm
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
