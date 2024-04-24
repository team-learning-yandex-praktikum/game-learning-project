import { useLocation } from 'react-router-dom'
import { matchRoutes } from 'react-router'
import { routesConfig } from '@routes'

export const useIsAuthPage = () => {
    const { pathname } = useLocation()
    const isAuthPage = matchRoutes(routesConfig, pathname)?.some(
        ({ route }) => route.isAuth
    )
    return isAuthPage
}
