import { useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import Sidebar from '@components/Sidebar'
import { routesConfig } from '@routes'
import { useCheckAuthentication, useIsAuthPage } from '@utils'
import './App.css'
import withErrorBoundary from '@utils/hocs/withErrorBoundary'
import Fallback from '@utils/hocs/withErrorBoundary/Fallback'
import { useAppSelector } from '@store/hooks'
import { settingsSelectors } from '@store/settings'

function App() {
    const renderRouter = useRoutes(routesConfig)
    const isAuthPage = useIsAuthPage()
    const themeMode = useAppSelector(settingsSelectors.selectThemeMode)

    useCheckAuthentication()

    useEffect(() => {
        const fetchServerData = async () => {
            const url = `http://localhost:${__SERVER_PORT__}`
            const response = await fetch(url)
            const data = await response.json()
            console.log(data)
        }

        fetchServerData()
    }, [])

    return (
        <div className="app" data-theme={themeMode}>
            {!isAuthPage && <Sidebar />}
            {renderRouter}
        </div>
    )
}

export default withErrorBoundary({ fallback: <Fallback /> })(App)
