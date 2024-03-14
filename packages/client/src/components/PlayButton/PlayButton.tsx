import React from 'react'
import { PlayColor } from '@assets/icons'
import style from './button.module.css'

const PlayButton = () => {
  return (
    <button className={style.button}>
      <div className={style.circle} />
      <PlayColor />
    </button>
  )
}

export default PlayButton
