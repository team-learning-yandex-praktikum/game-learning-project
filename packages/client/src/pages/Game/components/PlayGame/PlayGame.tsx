import { useSelector } from 'react-redux'
import { gameSelectors } from '@store/game'
import { FC, useEffect, useRef } from 'react'
import { GameWorld } from '@game-core/GameWorld'
import { Dispatch } from '@reduxjs/toolkit'

interface PlayGameProps {
    dispatch: Dispatch
}

const PlayGame: FC<PlayGameProps> = ({ dispatch }) => {
    const status = useSelector(gameSelectors.selectStatus)

    const worldRef = useRef<GameWorld | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const initWorld = () => {
        const root = containerRef.current

        if (!worldRef.current && root && root.childElementCount === 0) {
            worldRef.current = new GameWorld(root, dispatch)
        }
    }

    useEffect(() => {
        if (status === 'game') {
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
