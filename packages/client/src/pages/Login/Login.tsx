import { FC, useEffect, useState } from 'react'
import { Routes } from '@routes/constants'
import Form from '@components/Form'
import { fieldsConfig } from '@utils/validation/fieldsConfig'
import { useAuthentication } from '@utils'
import { LoginDTO } from '@api/auth/types'
import { useAppDispatch } from '@store/hooks'
import { login } from '@store/user'
import RedirectButton from '@components/RedirectButton'
import { oAuthApi } from '@api/oAuth'

const Login: FC = () => {
    const [urlYandex, setUrlYandex] = useState<string>('')

    const dispatch = useAppDispatch()

    const onLogin = useAuthentication(async (data: LoginDTO) => {
        await dispatch(login(data)).unwrap()
    })

    useEffect(() => {
        const ctrl = new AbortController()

        oAuthApi.urlYandex(ctrl.signal).then(res => {
            setUrlYandex(res)
        })

        return () => {
            ctrl.abort()
        }
    }, [])

    return (
        <>
            <RedirectButton url={urlYandex} label="Войти с помощью Яндекс" />
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
        </>
    )
}

export default Login
