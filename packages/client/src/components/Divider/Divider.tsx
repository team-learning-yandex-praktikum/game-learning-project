import { FC } from 'react'
import { DividerProps } from './types'
import style from './divider.module.css'
import { clsx } from 'clsx'

const Divider: FC<DividerProps> = ({ color }) => {
  return <div className={clsx(style.divider, color && style[color])}></div>
}

export default Divider
