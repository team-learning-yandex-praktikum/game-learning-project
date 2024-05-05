import { FieldValues } from 'react-hook-form'
import { ReactNode, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import OAuthButton from '@components/OAuthButton'
import Form from '@components/Form'
import { oAuthManager } from '@utils/authentication'
import { getWindow } from '@utils/document'
import styles from './authForm.module.css'
import { AuthFormProps } from './types'

const AuthForm = <Values extends FieldValues = FieldValues>({
    LinkProps,
    ...restProps
}: AuthFormProps<Values>) => {
    const handleClickOAuth = useCallback(async () => {
        const url = await oAuthManager.createRedirectUrl()

        if (url) {
            getWindow()?.location.replace(url)
        }
    }, [])

    const actionArray: ReactNode[] = useMemo(
        () => [
            <OAuthButton onClick={handleClickOAuth} key={'yandex-redirect'} />,
            <Link {...LinkProps} key={'link'} className={styles.link} />,
        ],
        [LinkProps, handleClickOAuth]
    )

    return <Form {...restProps} actionArray={actionArray} />
}

export default AuthForm
