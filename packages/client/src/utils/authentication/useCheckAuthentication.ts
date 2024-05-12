import { useNavigate } from 'react-router'
import { oAuthManager } from '@utils/authentication/oauth'
import { useCallback, useEffect } from 'react'
import { Routes } from '@routes/constants'
import { ErrorResponse } from '@types'
import { fetchUserData, oAuthLogin, userSelectors } from '@store/user'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { LoadStatus } from '@utils/store/enums'
import { AUTH_ERRORS } from '@utils/validation/errors'
import { useIsAuthPage } from '@utils/hooks'
import { getUrlQueryObj } from '@utils/url/helpers'

export const useCheckAuthentication = () => {
    const navigate = useNavigate()
    const isAuthPage = useIsAuthPage()
    const dispatch = useAppDispatch()
    const status = useAppSelector(userSelectors.selectStatus)

    const handleError = useCallback(
        (error: ErrorResponse) => {
            if (isAuthPage) {
                return
            }

            console.error(
                error.response?.data?.reason ?? error.message ?? error
            )
            if (error.message === AUTH_ERRORS.notAuthorized) {
                navigate(Routes.Login)
            } else {
                navigate(Routes.Error)
            }
        },
        [isAuthPage, navigate]
    )

    const authentication = useCallback(async () => {
        if (!oAuthManager.getState()) {
            await dispatch(fetchUserData()).unwrap()
            return
        }

        const queryObj = getUrlQueryObj()
        const localError = oAuthManager.checkError(queryObj)

        if (localError) {
            navigate(Routes.Error)
            return
        }

        await dispatch(oAuthLogin(queryObj.code)).unwrap()
        navigate(Routes.Home, { replace: true })
    }, [dispatch, navigate])

    const fetchMe = useCallback(async () => {
        try {
            await authentication()
        } catch (e) {
            handleError(e as ErrorResponse)
        }
    }, [authentication, handleError])

    useEffect(() => {
        if (status !== LoadStatus.idle || isAuthPage) {
            return
        }

        fetchMe()
    }, [status, isAuthPage, fetchMe])
}
