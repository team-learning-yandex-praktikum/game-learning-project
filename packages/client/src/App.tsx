import { useRoutes } from 'react-router-dom'
import Sidebar from '@components/Sidebar'
import { StatusCodes } from 'http-status-codes'
import { routesConfig } from '@routes'
import { useCheckAuthentication, useIsAuthPage } from '@utils'
import withErrorBoundary from '@utils/hocs/withErrorBoundary'
import { useAppSelector } from '@store/hooks'
import { settingsSelectors } from '@store/settings'
import ErrorPage from '@pages/ErrorPage'
import './App.css'

function App() {
    const renderRouter = useRoutes(routesConfig)
    const isAuthPage = useIsAuthPage()
    const themeMode = useAppSelector(settingsSelectors.selectThemeMode)

    useCheckAuthentication()

    return (
        <div className="app" data-theme={themeMode}>
            {!isAuthPage && <Sidebar />}
            {renderRouter}
        </div>
    )
}

export default withErrorBoundary({
    fallback: <ErrorPage code={StatusCodes.INTERNAL_SERVER_ERROR} />,
})(App)
