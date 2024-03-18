import CrazyTitle from '@components/CrazyTitle'
import PlayButton from '@components/PlayButton'
import React from 'react'

import style from './game.module.css'

const Game = () => {
  return (
    <div className={style.containerGame}>
      <CrazyTitle>jump-jump</CrazyTitle>
      <PlayButton />
    </div>
  )
}

export default Game
