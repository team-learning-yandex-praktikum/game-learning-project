import CrazyTitle from '@components/CrazyTitle'
import { RestartIcon } from '@assets/icons'
import RoundButton from '@components/RoundButton'
import { gameActions, gameSelectors } from '@store/game'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import style from './gameOver.module.css'
import Fullscreen from '@components/Fullscreen'

const GameOver = () => {
    const dispatch = useAppDispatch()

    const score = useAppSelector(gameSelectors.selectScore)

    const handleChangeStartGame = () => {
        dispatch(gameActions.startGame())
    }

    return (
        <div className={style.container}>
            <div className={style.overlay}>
                <div className={style.record}>
                    <CrazyTitle>{score}</CrazyTitle>
                    <div className={style.recordText}>
                        <span>Твой рекорд</span>
                        <span>{score}</span>
                    </div>
                </div>
                <RoundButton
                    icon={<RestartIcon />}
                    onClick={handleChangeStartGame}
                />
            </div>
            <Fullscreen />
        </div>
    )
}

export default GameOver
