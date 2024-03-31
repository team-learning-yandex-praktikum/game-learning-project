import CrazyTitle from '@components/CrazyTitle'
import { RestartIcon } from '@assets/icons'
import RoundButton from '@components/RoundButton'
import { gameActions, gameSelectors } from '@store/game'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@store/hooks'
import style from './gameOver.module.css'

const GameOver = () => {
    const dispatch = useAppDispatch()

    const score = useSelector(gameSelectors.selectScore)

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
        </div>
    )
}

export default GameOver
