import { FC } from 'react'
import style from './button.module.css'
import { RoundButtonProps } from './types'

const RoundButton: FC<RoundButtonProps> = ({ icon }) => {
  return (
    <button className={style.button}>
      <div className={style.circle}>{icon}</div>
    </button>
  )
}

export default RoundButton
