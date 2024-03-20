import { FC } from 'react'
import { RatingProps } from './types'
import { clsx } from 'clsx'
import style from './rating.module.css'
import Divider from '@components/Divider'
import { tableRows } from './constants'
import { Link } from 'react-router-dom'
import { Routes } from '@routes/constants'

const Rating: FC<RatingProps> = ({ className }) => (
    <div className={clsx(style.containerRating, className)}>
        <Divider color="orange" />
        <div className={style.title}>рейтинг в игре</div>
        <div className={style.text}>
            Попади в <Link to={Routes.LeaderBoard}>TOP</Link>
        </div>
        <div className={style.table}>
            {tableRows.map(row => (
                <div key={row.place} className={style.bodyTable}>
                    <span>{row.place}</span>
                    <span>{row.user}</span>
                    <span className={style.score}>{row.score}</span>
                </div>
            ))}
        </div>
    </div>
)

export default Rating
