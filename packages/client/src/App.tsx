import { useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import Sidebar from '@components'
import { ThemeMode } from '@styles'
import './App.css'
import { routesConfig } from '@routes'

function App() {
  const renderRouter = useRoutes(routesConfig)
  const [themeMode, setThemeMode] = useState<ThemeMode>(ThemeMode.light) // todo Вынести в стор

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
    <>
      {renderRouter}
      <div className="app" data-theme={themeMode}>
        <Sidebar themeMode={themeMode} setThemeMode={setThemeMode} />
        Вот тут будет жить ваше приложение :)
      </div>
    </>
  )
}

export default App
