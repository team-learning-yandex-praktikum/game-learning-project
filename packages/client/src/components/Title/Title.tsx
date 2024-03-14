import { FC } from 'react'
import styles from './title.module.css'
import { TitleColor, TitleProps } from './types'
import { clsx } from 'clsx'

const colorToClass: Record<TitleColor, string> = {
  main: styles.colorMain,
  secondary: styles.colorSecondary,
}

const Title: FC<TitleProps> = ({ className, color = 'main', ...restProps }) => (
  <h2
    {...restProps}
    className={clsx(styles.title, colorToClass[color], className)}
  />
)

export default Title
