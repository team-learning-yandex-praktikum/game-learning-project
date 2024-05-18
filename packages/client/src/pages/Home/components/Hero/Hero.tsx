import React from 'react'
import CrazyTitle from '@components/CrazyTitle'
import style from './hero.module.css'
import { Link } from 'react-router-dom'
import { Routes } from '@routes/constants'
import RoundButton from '@components/RoundButton'
import { PlayLargeIcon } from '@assets/icons'

const Hero = () => (
    <div className={style.containerHero}>
        <CrazyTitle>fallen-angel</CrazyTitle>
        <Link to={Routes.Game}>
            <RoundButton icon={<PlayLargeIcon />} />
        </Link>
    </div>
)

export default Hero
