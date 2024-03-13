import React from 'react'
import style from './home.module.css'
import Hero from './components/Hero'
import Rules from './components/Rules'
import Rating from './components/Rating'
import Team from './components/Team/Team'

const Home = () => {
  return (
    <div className={style.wrapper}>
      <Hero />
      <Rules className={style.container} />
      <Rating className={style.container} />
      <Team className={style.container} />
    </div>
  )
}

export default Home
