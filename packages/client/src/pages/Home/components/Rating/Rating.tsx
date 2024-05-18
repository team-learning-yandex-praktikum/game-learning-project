import { FC } from 'react'
import { clsx } from 'clsx'
import style from './rating.module.css'
import Divider from '@components/Divider'
import { tableRows } from './constants'
import { Link } from 'react-router-dom'
import { Routes } from '@routes/constants'

const Rating: FC = () => (
    <div className={clsx(style.containerRating, 'home-container')}>
        <div className="container">
            <Divider color="orange" />
            <div className={style.titleContainer}>
                <div className={style.title}>рейтинг в игре</div>
                <div className={style.text}>
                    Попади в <Link to={Routes.LeaderBoard}>TOP</Link>
                </div>
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
    </div>
)

export default Rating
