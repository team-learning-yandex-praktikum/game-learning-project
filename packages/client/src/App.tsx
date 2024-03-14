import { useEffect, useState } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'
import Sidebar from '@components/Sidebar'
import { ThemeMode } from '@styles'
import './App.css'
import { routesConfig } from '@routes'
import { Routes } from '@routes/constants'

function App() {
  const renderRouter = useRoutes(routesConfig)
  const [themeMode, setThemeMode] = useState<ThemeMode>(ThemeMode.light) // todo Вынести в стор

  const { pathname } = useLocation()
  const isAuthPage =
    pathname.includes(Routes.Registration) || pathname.includes(Routes.Login)

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
      {!isAuthPage && (
        <Sidebar themeMode={themeMode} setThemeMode={setThemeMode} />
      )}
      {renderRouter}
    </div>
  )
}

export default App
