import CrazyTitle from '@components/CrazyTitle'
import style from './game.module.css'
import RoundButton from '@components/RoundButton'
import { PlayIcon } from '@assets/icons'
import { GameWorld } from '@game-core/GameWorld'
import { useCallback, useEffect, useRef } from 'react'

const StartGame = () => {
    let world: GameWorld
    const ref = useRef<HTMLDivElement>(null)

    const init = useCallback(() => {
        const root = ref.current
        if (!world && root !== null) {
            world = new GameWorld(root)
        }
    }, [])

    useEffect(() => init(), [])

    return (
        <>
            <div className={style.containerGame}>
                <CrazyTitle>jump-jump</CrazyTitle>
                <RoundButton icon={<PlayIcon />} />
                <div ref={ref} />
            </div>
        </>
    )
}

export default StartGame
