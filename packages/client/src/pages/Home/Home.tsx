import React from 'react'
import style from './home.module.css'
import Hero from './components/Hero'
import Rules from './components/Rules'
import Rating from './components/Rating'
import Team from './components/Team'

const Home = () => (
    <div className={style.wrapper}>
        <Hero />
        <Rules />
        <Rating />
        <Team />
    </div>
)

export default Home
