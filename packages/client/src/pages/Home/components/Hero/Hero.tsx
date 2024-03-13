import React from 'react'
import CrazyTitle from '../../../../components/CrazyTitle'
import style from './hero.module.css'
import PlayButton from '../../../../components/PlayButton/PlayButton'

const Hero = () => {
  return (
    <div className={style.containerHero}>
      <CrazyTitle>jump-jump</CrazyTitle>
      <PlayButton />
    </div>
  )
}

export default Hero
