import { useEffect } from 'react'
import './App.css'
import { routes } from './routes'
import { useRoutes } from 'react-router'

function App() {
  const route = useRoutes(routes)
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
      {route}
      <div className="App">Вот тут будет жить ваше приложение :)</div>
    </>
  )
}

export default App
