import StartGame from './components/StartGame'
import GameOver from './components/GameOver'
import { useSelector } from 'react-redux'
import { gameActions, gameSelectors } from '@store/game'
import { useAppDispatch } from '@store/hooks'
import { useEffect } from 'react'
import PlayGame from '@pages/Game/components/PlayGame'

const Game = () => {
    const status = useSelector(gameSelectors.selectStatus)

    const dispatch = useAppDispatch()

    useEffect(
        () => () => {
            dispatch(gameActions.resetGame())
        },
        []
    )

    console.log(status)

    if (status === 'finish') {
        return <GameOver dispatch={dispatch} />
    }

    if (status === 'game') {
        return <PlayGame dispatch={dispatch} />
    }

    return <StartGame dispatch={dispatch} />
}

export default Game
