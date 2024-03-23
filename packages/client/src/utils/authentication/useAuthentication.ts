import { SubmitHandler } from 'react-hook-form'
import { FieldValues } from '@utils/validation/fields'
import { useNavigate } from 'react-router'
import { useCallback } from 'react'
import { Routes } from '@routes/constants'
import { ErrorResponse } from '@types'
import { AUTH_ERRORS } from '@utils/validation/errors'

export const useAuthentication = (callback: SubmitHandler<FieldValues>) => {
    const navigate = useNavigate()

    const authFn: SubmitHandler<FieldValues> = useCallback(
        async data => {
            try {
                await callback(data)
                navigate(Routes.Home)
            } catch (e) {
                const error = e as ErrorResponse
                if (
                    error.response?.status === 400 &&
                    error.response?.data?.reason === AUTH_ERRORS.authenticated
                ) {
                    navigate(Routes.Home)
                }
                console.error(error)
            }
        },
        [callback, navigate]
    )

    return authFn
}
