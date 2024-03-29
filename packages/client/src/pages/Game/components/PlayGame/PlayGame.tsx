import { useSelector } from 'react-redux'
import { gameActions, gameSelectors } from '@store/game'
import { useCallback, useEffect, useRef } from 'react'
import { GameWorld } from '@game-core/GameWorld'
import { useAppDispatch } from '@store/hooks'
import { STATUSES } from '@store/constants'

const PlayGame = () => {
    const dispatch = useAppDispatch()

    const finishGameHandler = useCallback(
        (score: number) => {
            dispatch(gameActions.finishGame(score))
        },
        [dispatch]
    )

    const status = useSelector(gameSelectors.selectStatus)

    const worldRef = useRef<GameWorld | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const initWorld = () => {
        const root = containerRef.current

        if (!worldRef.current && root && root.childElementCount === 0) {
            worldRef.current = new GameWorld(root, finishGameHandler)
        }
    }

    useEffect(() => {
        if (status === STATUSES.GAME) {
            initWorld()
        }

        return () => {
            if (worldRef.current) {
                worldRef.current = null
            }
        }
    }, [status])

    return <div ref={containerRef} />
}

export default PlayGame
