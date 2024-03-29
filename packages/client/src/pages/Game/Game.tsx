import StartGame from './components/StartGame'
import GameOver from './components/GameOver'
import { useSelector } from 'react-redux'
import { gameActions, gameSelectors } from '@store/game'
import { useAppDispatch } from '@store/hooks'
import { useEffect } from 'react'
import PlayGame from '@pages/Game/components/PlayGame'
import { STATUSES } from '@store/constants'

const Game = () => {
    const status = useSelector(gameSelectors.selectStatus)

    const dispatch = useAppDispatch()

    useEffect(
        () => () => {
            dispatch(gameActions.resetGame())
        },
        []
    )

    if (status === STATUSES.FINISH) {
        return <GameOver />
    }

    if (status === STATUSES.GAME) {
        return <PlayGame />
    }

    return <StartGame />
}

export default Game
