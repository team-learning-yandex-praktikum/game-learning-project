import StartGame from './components/StartGame'
import GameOver from './components/GameOver'

const Game = () => {
  // todo исправить после добавления игры
  const isStartGame = true

  return isStartGame ? <StartGame /> : <GameOver />
}

export default Game
