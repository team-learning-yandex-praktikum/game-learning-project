import CrazyTitle from '@components/CrazyTitle'
import { RestartIcon } from '@assets/icons'

import style from './gameOver.module.css'
import RoundButton from '@components/RoundButton'

const GameOver = () => {
  return (
    <div className={style.container}>
      <div className={style.overlay}>
        <div className={style.record}>
          <CrazyTitle>1024</CrazyTitle>
          <div className={style.recordText}>
            <span>Твой рекорд</span>
            <span>1024</span>
          </div>
        </div>
        <RoundButton icon={<RestartIcon />} />
      </div>
    </div>
  )
}

export default GameOver
