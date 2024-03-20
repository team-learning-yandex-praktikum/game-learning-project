import { useNavigate } from 'react-router'
import { useIsAuthPage } from '@utils'
import { useCallback, useEffect, useState } from 'react'
import { UserDTO } from '@api/auth/types'
import { Routes } from '@routes/constants'
import { authApi } from '@api'
import { ErrorResponse } from '@types'

export const useCheckAuthentication = () => {
  const navigate = useNavigate()
  const isAuthPage = useIsAuthPage()
  const [userData, setUserData] = useState<UserDTO | null>(null)

  const redirectToLogin = useCallback(() => {
    if (isAuthPage) {
      return
    }

    navigate(Routes.Login)
  }, [isAuthPage])

  const fetchMe = useCallback(async () => {
    try {
      const response = await authApi.me()
      setUserData(response)
    } catch (e) {
      setUserData(null)
      const error = e as ErrorResponse
      console.error(error.response?.data.reason)

      if (error.response?.status === 401) {
        redirectToLogin()
      }
    }
  }, [redirectToLogin])

  useEffect(() => {
    if (userData || isAuthPage) {
      return
    }

    fetchMe()
  }, [userData, isAuthPage, fetchMe])

  return { userData, setUserData }
}
