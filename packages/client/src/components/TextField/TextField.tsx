import { FC } from 'react'
import styles from './textField.module.css'
import { TextFieldProps } from './types'

const TextField: FC<TextFieldProps> = ({ label, error, ...restProps }) => (
  <div className={styles.textField} data-error={Boolean(error)}>
    <div className={styles.field}>
      <label className={styles.label} htmlFor={restProps.name}>
        {label}
      </label>
      <input className={styles.input} id={restProps.name} {...restProps} />
    </div>
    <div className={styles.errorLine}>{error}</div>
  </div>
)

export default TextField
