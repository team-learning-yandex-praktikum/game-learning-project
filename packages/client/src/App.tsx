import { useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import Sidebar from '@components/Sidebar'
import { ThemeMode } from '@styles'
import { routesConfig } from '@routes'
import { useCheckAuthentication, useIsAuthPage } from '@utils'
import './App.css'

function App() {
  const renderRouter = useRoutes(routesConfig)
  const isAuthPage = useIsAuthPage()
  const [themeMode, setThemeMode] = useState<ThemeMode>(ThemeMode.light) // todo Вынести в стор

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
      {!isAuthPage && (
        <Sidebar themeMode={themeMode} setThemeMode={setThemeMode} />
      )}
      {renderRouter}
    </div>
  )
}

export default App
