import CrazyTitle from '@components/CrazyTitle'
import style from './game.module.css'
import RoundButton from '@components/RoundButton'
import { PlayIcon } from '@assets/icons'
import { gameActions } from '@store/game'
import { useAppDispatch } from '@store/hooks'
import { GameWorld } from '@game-core/GameWorld'
import { useEffect, useRef } from 'react'
import { Nullable } from '@game-core/utils/CommonTypes'
import Fullscreen from '@components/Fullscreen'

const StartGame = () => {
    const dispatch = useAppDispatch()

    const handleChangeStartGame = () => {
        dispatch(gameActions.startGame())
    }

    return (
        <div className={style.containerGame}>
            <CrazyTitle>start game</CrazyTitle>
            <RoundButton icon={<PlayIcon />} onClick={handleChangeStartGame} />
            <Fullscreen />
        </div>
    )
}

export default StartGame
