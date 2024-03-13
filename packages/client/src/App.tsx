import { useEffect } from 'react'
import './App.css'
import { routesConfig } from './routes'
import { useRoutes } from 'react-router-dom'

function App() {
  const renderRouter = useRoutes(routesConfig)
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
      <div className="App">Вот тут будет жить ваше приложение :)</div>
    </>
  )
}

export default App
