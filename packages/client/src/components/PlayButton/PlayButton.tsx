import { PlayIcon } from '@assets/icons'
import style from './button.module.css'

const PlayButton = () => {
  return (
    <button className={style.button}>
      <div className={style.circle}>
        <PlayIcon />
      </div>
    </button>
  )
}

export default PlayButton
