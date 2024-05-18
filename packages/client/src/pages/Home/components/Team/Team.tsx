import { FC } from 'react'
import { clsx } from 'clsx'
import style from './team.module.css'
import Divider from '@components/Divider'
import { teamMap } from './constants'

const Team: FC = () => (
    <div className={clsx('home-container', style.containerTeam)}>
        <div className="container">
            <Divider color="yellow" />
            <div className={style.title}>команда Разработки</div>
            <div className={style.teamContainer}>
                {teamMap.map(it => (
                    <div key={it.lastName} className={style.members}>
                        <div className={style.avatar}>{it.avatar}</div>
                        <div>
                            <div className={style.text}>{it.firstName}</div>
                            <div className={style.text}>{it.lastName}</div>
                        </div>
                    </div>
                ))}
            </div>
            <footer className={style.footer}>
                <span>© GameCodeCrafters - 2024</span>
                <span>Яндекс.Практикум</span>
            </footer>
        </div>
    </div>
)

export default Team
