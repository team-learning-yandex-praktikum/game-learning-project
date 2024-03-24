import { useNavigate } from 'react-router'
import { useIsAuthPage } from '@utils'
import { useCallback, useEffect } from 'react'
import { Routes } from '@routes/constants'
import { ErrorResponse } from '@types'
import { fetchUserData, userSelectors } from '@store/user'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { LoadStatus } from '@store/enums'
import { AUTH_ERRORS } from '@utils/validation/errors'

export const useCheckAuthentication = () => {
    const navigate = useNavigate()
    const isAuthPage = useIsAuthPage()
    const dispatch = useAppDispatch()
    const status = useAppSelector(userSelectors.selectStatus)

    const redirectToLogin = useCallback(() => {
        if (isAuthPage) {
            return
        }

        navigate(Routes.Login)
    }, [isAuthPage, navigate])

    const fetchMe = useCallback(async () => {
        try {
            await dispatch(fetchUserData()).unwrap()
        } catch (e) {
            const error = e as ErrorResponse
            if (error.message === AUTH_ERRORS.notAuthorized) {
                redirectToLogin()
            }
        }
    }, [dispatch, redirectToLogin])

    useEffect(() => {
        if (status !== LoadStatus.idle || isAuthPage) {
            return
        }

        fetchMe()
    }, [status, isAuthPage, fetchMe])
}
