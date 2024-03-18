import CrazyTitle from '@components/CrazyTitle'

import style from './game.module.css'
import RoundButton from '@components/RoundButton'
import { PlayIcon } from '@assets/icons'

const StartGame = () => {
  return (
    <>
      <div className={style.containerGame}>
        <CrazyTitle>jump-jump</CrazyTitle>
        <RoundButton icon={<PlayIcon />} />
      </div>
    </>
  )
}

export default StartGame
