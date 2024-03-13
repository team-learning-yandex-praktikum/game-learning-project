import React, { FC } from 'react'
import { RatingProps } from './types'
import { clsx } from 'clsx'
import style from './rating.module.css'
import Divider from '../../../../components/Divider/Divider'
import { tableRows } from './constants'

const Rating: FC<RatingProps> = ({ className }) => {
  return (
    <div className={clsx(style.containerRating, className)}>
      <Divider className={style.divider} />
      <div className={style.title}>рейтинг в игре</div>
      <div className={style.text}>
        Попади в <span>TOP</span>
      </div>
      <table className={style.table}>
        <tbody>
          {tableRows.map(row => (
            <tr key={row.place}>
              <td className={style.place}>{row.place}</td>
              <td className={style.user}>{row.user}</td>
              <td className={style.score}>{row.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Rating
