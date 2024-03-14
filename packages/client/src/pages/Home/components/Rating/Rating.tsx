import React, { FC } from 'react'
import { RatingProps } from './types'
import { clsx } from 'clsx'
import style from './rating.module.css'
import Divider from '@components/Divider'
import { tableRows } from './constants'

const Rating: FC<RatingProps> = ({ className }) => {
  return (
    <div className={clsx(style.containerRating, className)}>
      <Divider className={style.divider} />
      <div className={style.title}>рейтинг в игре</div>
      <div className={style.text}>
        Попади в <span>TOP</span>
      </div>
      <div className={style.table}>
        {tableRows.map(row => (
          <div key={row.place} className={style.bodyTable}>
            <span>{row.place}</span>
            <span>{row.user}</span>
            <span>{row.score}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Rating
