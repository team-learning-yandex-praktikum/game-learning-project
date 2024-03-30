import CrazyTitle from '@components/CrazyTitle'
import style from './game.module.css'
import RoundButton from '@components/RoundButton'
import { PlayIcon } from '@assets/icons'
import { GameWorld } from '@game-core/GameWorld'
import { useEffect, useRef } from 'react'
import { Nullable } from '@game-core/utils/CommonTypes'

const StartGame = () => {
    let world: Nullable<GameWorld> = null
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const root = ref.current
        if (world === null && root !== null) {
            world = new GameWorld(root)
        }
    }, [world, ref])

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
