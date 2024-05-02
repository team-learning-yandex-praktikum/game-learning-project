import style from './loader.module.css'
import { LoaderProps } from './types'
import { FC } from 'react'
import { clsx } from 'clsx'

const Loader: FC<LoaderProps> = ({ className }) => (
    <div className={style.loaderContainer}>
        <div className={clsx(className, style.loader)} />
    </div>
)

export default Loader
