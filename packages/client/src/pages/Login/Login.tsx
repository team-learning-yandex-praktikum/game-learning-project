import { FC } from 'react'
import { Routes } from '@routes/constants'
import { fieldsConfig } from '@utils/validation/fieldsConfig'
import { useAuthentication } from '@utils'
import { LoginDTO } from '@api/auth/types'
import { useAppDispatch } from '@store/hooks'
import { login } from '@store/user'
import AuthForm from '@components/AuthForm'

const Login: FC = () => {
    const dispatch = useAppDispatch()

    const onLogin = useAuthentication(async (data: LoginDTO) => {
        await dispatch(login(data)).unwrap()
    })

    return (
        <AuthForm
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
