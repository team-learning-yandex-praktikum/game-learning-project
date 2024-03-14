import React, { FC } from 'react'
import { TeamProps } from './types'
import { clsx } from 'clsx'
import style from './team.module.css'
import Divider from '@components/Divider'
import { teamMap } from './constants'

const Team: FC<TeamProps> = ({ className }) => {
  return (
    <div className={clsx(style.containerTeam, className)}>
      <Divider className={style.divider} />
      <div className={style.title}>команда Разработки</div>
      <div className={style.teamContainer}>
        {teamMap.map(it => (
          <div className={style.members}>
            <div className={style.avatar}>{it.avatar}</div>

            <div>
              <div className={style.text}>{it.firstName}</div>
              <div className={style.text}>{it.lastName}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Team
