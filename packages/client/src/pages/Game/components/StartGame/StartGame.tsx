import CrazyTitle from '@components/CrazyTitle'
import style from './game.module.css'
import RoundButton from '@components/RoundButton'
import { PlayIcon } from '@assets/icons'
import { FC } from 'react'
import { gameActions } from '@store/game'
import { Dispatch } from '@reduxjs/toolkit'

interface StartGameProps {
    dispatch: Dispatch
}

const StartGame: FC<StartGameProps> = ({ dispatch }) => {
    const handleChangeStartGame = () => {
        dispatch(gameActions.startGame())
    }

    return (
        <div className={style.containerGame}>
            <CrazyTitle>start game</CrazyTitle>
            <RoundButton icon={<PlayIcon />} onClick={handleChangeStartGame} />
        </div>
    )
}

export default StartGame
