import CrazyTitle from '@components/CrazyTitle'
import style from './game.module.css'
import RoundButton from '@components/RoundButton'
import { PlayLargeIcon } from '@assets/icons'
import { gameActions } from '@store/game'
import { useAppDispatch } from '@store/hooks'
import Fullscreen from '@components/Fullscreen'

const StartGame = () => {
    const dispatch = useAppDispatch()

    const handleChangeStartGame = () => {
        dispatch(gameActions.startGame())
    }

    return (
        <div className={style.containerGame}>
            <CrazyTitle>start game</CrazyTitle>
            <RoundButton
                icon={<PlayLargeIcon />}
                onClick={handleChangeStartGame}
            />
            <Fullscreen />
        </div>
    )
}

export default StartGame
