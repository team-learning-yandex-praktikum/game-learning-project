import {
    ErrCodeParam,
    ErrDescParam,
    ErrorNoState,
    ErrorState,
    OAuthApi,
    StateParam,
    oAuthApi,
} from '@api/oAuth'
import { OauthSignInRequest } from '@api/oAuth/types'
import { Routes } from '@routes/constants'
import { useAppDispatch } from '@store/hooks'
import { loginWithYandex } from '@store/user'
import { ErrorResponse } from '@types'
import { checkState } from '@utils/authentication/oauth'
import { hasKey, isEmptyStr } from '@utils/common/checks'
import { getUrlQueryObj } from '@utils/url/helpers'
import { FC, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const logError = console.error

const OAuthCallback: FC = () => {
    const [error, setError] = useState('')

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const login = useCallback(async (code: string) => {
        try {
            await dispatch(loginWithYandex(code)).unwrap()
            navigate(Routes.Home)
        } catch (e) {
            const err = e as ErrorResponse
            const desc = err.response?.data?.reason ?? ''
            setError(desc)
        }
    }, [])

    useEffect(() => {
        try {
            const obj = getUrlQueryObj()

            if (hasKey(ErrCodeParam, obj)) {
                const errCode = obj[ErrCodeParam]
                const errDesc = obj[ErrDescParam]
                const err = `Ошибка авторизации: ${errDesc} (код ошибки - ${errCode})`
                setError(err)
                return
            }

            if (!hasKey(StateParam, obj)) {
                const err = `Ошибка авторизации: ${ErrorNoState}`
                setError(err)
                return
            }

            const state = obj[StateParam]
            if (!checkState(state)) {
                const err = `Ошибка авторизации: ${ErrorState}`
                setError(err)
                return
            }

            login(obj.code)
        } catch (e) {
            logError(e)
        } finally {
            oAuthApi.cleanup()
        }
    }, [])

    return isEmptyStr(error) ? (
        <div>идет процесс OAuth-авторизации ...</div>
    ) : (
        <div>{error}</div>
    )
}

export { OAuthCallback }
