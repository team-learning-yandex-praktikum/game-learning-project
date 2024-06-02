import StartGame from './components/StartGame'
import GameOver from './components/GameOver'
import { gameActions, gameSelectors } from '@store/game'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { useEffect, useRef } from 'react'
import PlayGame from '@pages/Game/components/PlayGame'
import { STATUSES } from '@store/constants'
import { InputHandler } from '@game-core/input/InputHandler'

const Game = () => {
    const status = useAppSelector(gameSelectors.selectStatus)

    const dispatch = useAppDispatch()
    const inputHandlerRef = useRef<InputHandler | null>(null)

    useEffect(() => {
        inputHandlerRef.current = new InputHandler()

        return () => {
            inputHandlerRef.current?.setGameActive(false)
            dispatch(gameActions.resetGame())
        }
    }, [dispatch])

    useEffect(() => {
        if (inputHandlerRef.current) {
            inputHandlerRef.current.setGameActive(status === STATUSES.GAME)
        }
    }, [status])

    if (status === STATUSES.FINISH) {
        return <GameOver />
    }

    if (status === STATUSES.GAME) {
        return <PlayGame />
    }

    return <StartGame />
}

export default Game
