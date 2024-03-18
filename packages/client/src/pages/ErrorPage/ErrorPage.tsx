import { FC } from 'react'
import styles from './errorPage.module.css'
import { ErrorPageProps } from './types'
import { UI_ERRORS } from './constants'

const ErrorPage: FC<ErrorPageProps> = ({ code = '', message }) => {
  return (
    <div className={styles.root}>
      <div className={styles.code}>{code}</div>
      <div className={styles.message}>{message ?? UI_ERRORS[code]}</div>
    </div>
  )
}

export default ErrorPage
