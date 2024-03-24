import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useCallback } from 'react'
import { Routes } from '@routes/constants'
import { ErrorResponse } from '@types'
import { AUTH_ERRORS } from '@utils/validation/errors'

export const useAuthentication = <Values extends FieldValues = FieldValues>(
    callback: SubmitHandler<Values>
) => {
    const navigate = useNavigate()

    const authFn: SubmitHandler<Values> = useCallback(
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
