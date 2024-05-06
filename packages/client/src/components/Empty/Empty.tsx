import { FC } from 'react'
import style from './empty.module.css'
import { EmptyProps } from './types'

const Empty: FC<EmptyProps> = ({ description }) => (
    <div className={style.description}>{description ?? 'No data'}</div>
)

export default Empty
