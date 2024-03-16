import React from 'react'
import CrazyTitle from '@components/CrazyTitle'
import style from './hero.module.css'
import PlayButton from '@components/PlayButton'
import { Link } from 'react-router-dom'
import { Routes } from '@routes/constants'

const Hero = () => {
  return (
    <div className={style.containerHero}>
      <CrazyTitle>jump-jump</CrazyTitle>
      <Link to={Routes.Game}>
        <PlayButton />
      </Link>
    </div>
  )
}

export default Hero
