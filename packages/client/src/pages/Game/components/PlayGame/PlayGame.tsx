import { useSelector } from 'react-redux'
import { gameActions, gameSelectors } from '@store/game'
import { useCallback, useEffect, useRef } from 'react'
import { GameWorld } from '@game-core/GameWorld'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { STATUSES } from '@store/constants'
import Fullscreen from '@components/Fullscreen'
import { userSelectors } from '@store/user'
import { teamName } from '@api/leaderBoard/constants'
import { saveRecord } from '@store/leaderboard'

const PlayGame = () => {
    const userData = useAppSelector(userSelectors.selectData)
    const dispatch = useAppDispatch()

    const finishGameHandler = useCallback((score: number) => {
        dispatch(gameActions.finishGame(score))
        dispatch(
            saveRecord({
                data: {
                    user_id: userData.id,
                    user_name: userData.firstName,
                    [teamName]: score,
                },
                ratingFieldName: teamName,
                teamName: teamName,
            })
        )
    }, [])

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

    return (
        <>
            <div ref={containerRef} />
            <Fullscreen />
        </>
    )
}

export default PlayGame
