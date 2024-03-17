import React from 'react'
import CrazyTitle from '@components/CrazyTitle'
import style from './hero.module.css'
import { Link } from 'react-router-dom'
import { Routes } from '@routes/constants'
import RoundButton from '@components/RoundButton'
import { PlayIcon } from '@assets/icons'

const Hero = () => {
  return (
    <div className={style.containerHero}>
      <CrazyTitle>jump-jump</CrazyTitle>
      <Link to={Routes.Game}>
        <RoundButton icon={<PlayIcon />} />
      </Link>
    </div>
  )
}

export default Hero
