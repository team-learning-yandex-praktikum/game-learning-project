import { FC, useCallback } from 'react'
import { StatusCodes } from 'http-status-codes'
import { useNavigate } from 'react-router'
import { RestartIcon } from '@assets/icons'
import { Routes } from '@routes/constants'
import { getWindow } from '@utils/document'
import { useSidebarMode } from '@utils/hooks'
import { ErrorPageProps } from './types'
import { UI_ERRORS } from './constants'
import styles from './errorPage.module.css'

const ErrorPage: FC<ErrorPageProps> = ({ code = '', message }) => {
    const navigate = useNavigate()

    const handleRedirect = useCallback(() => {
        navigate(Routes.Home, { replace: true })
    }, [navigate])

    const handleReload = useCallback(() => {
        getWindow()?.location.reload()
    }, [])

    useSidebarMode('return')

    return (
        <div className={styles.root}>
            <div className={styles.code}>{code}</div>
            <div className={styles.message}>
                {message ?? UI_ERRORS[code as StatusCodes]}
            </div>
            <div className={styles.actions}>
                <button className={styles.reload} onClick={handleReload}>
                    <RestartIcon />
                </button>
                <button className={styles.redirect} onClick={handleRedirect}>
                    Перейти на главную
                </button>
            </div>
        </div>
    )
}

export default ErrorPage
