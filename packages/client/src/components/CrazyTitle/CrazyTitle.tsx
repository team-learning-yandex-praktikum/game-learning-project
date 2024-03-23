import { FC } from 'react'
import { CrazyTitleProps } from './types'

import style from './title.module.css'

const CrazyTitle: FC<CrazyTitleProps> = ({ children }) => (
    <div className={style.containerButton}>
        <div className={style.orange}>{children}</div>
        <div className={style.yellow}>{children}</div>
        <div className={style.transparent}>{children}</div>
    </div>
)

export default CrazyTitle
