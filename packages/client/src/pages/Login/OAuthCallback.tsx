import {
    ERRCODE_PARAM,
    ERRDESC_PARAM,
    ERROR_NOSTATE,
    ERROR_STATE,
    OAuthApi,
    STATE_PARAM,
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
            const queryObj = getUrlQueryObj()

            if (hasKey(ERRCODE_PARAM, queryObj)) {
                const errCode = queryObj[ERRCODE_PARAM]
                const errDesc = queryObj[ERRDESC_PARAM]
                const err = `Ошибка авторизации: ${errDesc} (код ошибки - ${errCode})`
                setError(err)
                return
            }

            if (!hasKey(STATE_PARAM, queryObj)) {
                const err = `Ошибка авторизации: ${ERROR_NOSTATE}`
                setError(err)
                return
            }

            const state = queryObj[STATE_PARAM]
            if (!checkState(state)) {
                const err = `Ошибка авторизации: ${ERROR_STATE}`
                setError(err)
                return
            }

            login(queryObj.code)
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
