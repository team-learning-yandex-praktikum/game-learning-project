import { Link } from 'react-router-dom'
import { Routes } from '@/routes/constants'
import { FallbackProps } from './types'
import { FC } from 'react'

import style from './fallback.module.css'

const Fallback: FC<FallbackProps> = ({ clear }) => {
  return (
    <div className={style.fallback}>
      <h1>Something went wrong.</h1>
      <Link to={Routes.Home}>
        <button className={style.button} onClick={clear}>
          Go back to home page
        </button>
      </Link>
    </div>
  )
}

export default Fallback
