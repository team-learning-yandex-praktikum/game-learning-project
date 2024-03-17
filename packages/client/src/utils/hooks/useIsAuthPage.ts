import { useMatch } from 'react-router-dom'
import { Routes } from '@routes/constants'

export const useIsAuthPage = () => {
  const isLogin = useMatch(Routes.Login)
  const isRegistration = useMatch(Routes.Registration)
  return isLogin || isRegistration
}
