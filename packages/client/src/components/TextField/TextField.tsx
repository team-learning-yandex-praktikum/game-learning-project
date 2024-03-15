import { forwardRef } from 'react'
import styles from './textField.module.css'
import { TextFieldProps } from './types'

const TextField = forwardRef<HTMLDivElement, TextFieldProps>(
  ({ label, error, ...restProps }, ref) => {
    const errorMessage = typeof error === 'string' ? error : error?.message

    return (
      <div ref={ref} className={styles.textField} data-error={Boolean(error)}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={restProps.name}>
            {label}
          </label>
          <input className={styles.input} id={restProps.name} {...restProps} />
        </div>
        <div className={styles.errorLine}>{errorMessage}</div>
      </div>
    )
  }
)

export default TextField
